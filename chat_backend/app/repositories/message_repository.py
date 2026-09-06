from sqlalchemy.orm import Session

from app.models.message import Message
from app.models.enums import MessageStatus


class MessageRepository:

    def __init__(self, db: Session):
        self.db = db

    # ----------------------------
    # Create Message
    # ----------------------------
    def create(
        self,
        conversation_id: int,
        sender_id: str,
        message: str,
        message_type,
        attachment_url: str | None = None,
        attachment_name: str | None = None,
    ) -> Message:

        msg = Message(
            conversation_id=conversation_id,
            sender_id=sender_id,
            message=message,
            message_type=message_type,
            attachment_url=attachment_url,
            attachment_name=attachment_name,
            status=MessageStatus.SENT,
        )

        self.db.add(msg)
        self.db.commit()
        self.db.refresh(msg)

        return msg

    # ----------------------------
    # Get Message By ID
    # ----------------------------
    def get_by_id(
        self,
        message_id: int,
    ) -> Message | None:

        return (
            self.db.query(Message)
            .filter(Message.id == message_id)
            .first()
        )

    # ----------------------------
    # Update Status
    # ----------------------------
    def update_status(
        self,
        message_id: int,
        status: MessageStatus,
    ) -> Message | None:

        message = self.get_by_id(message_id)

        if message is None:
            return None

        message.status = status

        self.db.commit()
        self.db.refresh(message)

        return message

    # ----------------------------
    # Pagination (Production)
    # ----------------------------
    def get_by_conversation(
        self,
        conversation_id: int,
        limit: int = 30,
        offset: int = 0,
    ):

        messages = (
            self.db.query(Message)
            .filter(
                Message.conversation_id == conversation_id
            )
            .order_by(Message.created_at.desc())
            .offset(offset)
            .limit(limit)
            .all()
        )

        # Frontend oldest -> newest dikhayega
        return list(reversed(messages))