from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.db.database import SessionLocal
from app.models.enums import MessageStatus, MessageType
from app.services.message_service import MessageService
from app.websocket.manager import manager

router = APIRouter()


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(user_id, websocket)

    db = SessionLocal()
    service = MessageService(db)

    try:
        while True:
            data = await websocket.receive_json()
            event_type = data.get("type")

            # ----------------------------------
            # Typing Event
            # ----------------------------------
            if event_type == "typing":
                conversation = service.conversation_repository.get_by_id(
                    data["conversation_id"]
                )

                if conversation is None:
                    continue

                if user_id == conversation.buyer_id:
                    receiver_id = conversation.seller_id
                else:
                    receiver_id = conversation.buyer_id

                if manager.is_online(receiver_id):
                    await manager.send_personal_message(
                        receiver_id,
                        {
                            "type": "typing",
                            "sender_id": user_id,
                        },
                    )
                continue

            if event_type == "stop_typing":
                conversation = service.conversation_repository.get_by_id(
                    data["conversation_id"]
                )

                if conversation is None:
                    continue

                if user_id == conversation.buyer_id:
                    receiver_id = conversation.seller_id
                else:
                    receiver_id = conversation.buyer_id

                if manager.is_online(receiver_id):
                    await manager.send_personal_message(
                        receiver_id,
                        {
                            "type": "stop_typing",
                            "sender_id": user_id,
                        },
                    )
                continue

            # ----------------------------------
            # Seen Event
            # ----------------------------------
            if data.get("type") == "seen":
                message_id = data.get("message_id")

                updated = service.update_status(
                    message_id=message_id,
                    status=MessageStatus.SEEN,
                )

                if updated:
                    await manager.send_personal_message(
                        updated.sender_id,
                        {
                            "type": "status",
                            "message_id": updated.id,
                            "status": updated.status.value,
                        },
                    )
                continue

            # ----------------------------------
            # Normal Message
            # ----------------------------------
            conversation_id = data.get("conversation_id")
            message = data.get("message")
            attachment_url = data.get("attachment_url")
            attachment_name = data.get("attachment_name")
            message_type = MessageType(data.get("message_type", MessageType.TEXT))

            if conversation_id is None or (not message and not attachment_url):
                await websocket.send_json(
                    {
                        "success": False,
                        "message": "conversation_id and message are required",
                    }
                )
                continue

            # Save Message
            try:
                message_obj, receiver_id = service.send_message(
                    conversation_id=conversation_id,
                    sender_id=user_id,
                    message=message or attachment_name or "Shared a document",
                    message_type=message_type,
                    attachment_url=attachment_url,
                    attachment_name=attachment_name,
                )
            except Exception as error:
                await websocket.send_json(
                    {
                        "type": "error",
                        "success": False,
                        "message": str(error),
                    }
                )
                continue

            # Receiver Online?
            if manager.is_online(receiver_id):
                message_obj = service.update_status(
                    message_obj.id,
                    MessageStatus.DELIVERED,
                )

            payload = {
                "type": "message",
                "id": message_obj.id,
                "conversation_id": message_obj.conversation_id,
                "sender_id": message_obj.sender_id,
                "receiver_id": receiver_id,
                "message": message_obj.message,
                "message_type": message_obj.message_type.value,
                "attachment_url": message_obj.attachment_url,
                "attachment_name": message_obj.attachment_name,
                "status": message_obj.status.value,
                "created_at": str(message_obj.created_at),
            }

            # ACK Sender
            if manager.is_online(user_id):
                await manager.send_personal_message(user_id, payload)

            # Receiver
            if manager.is_online(receiver_id):
                await manager.send_personal_message(receiver_id, payload)

    except WebSocketDisconnect:
        manager.disconnect(user_id)

    finally:
        db.close()
