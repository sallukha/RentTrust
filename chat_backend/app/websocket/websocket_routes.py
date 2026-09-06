from fastapi import APIRouter
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from app.websocket.connection_manager import manager

router = APIRouter()


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: str,
):
    await manager.connect(user_id, websocket)

    try:
        while True:
            data = await websocket.receive_text()

            print(f"User {user_id}: {data}")

    except WebSocketDisconnect:
        manager.disconnect(user_id)