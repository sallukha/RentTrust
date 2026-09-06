from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.conversation import (
    ConversationCreate,
    ConversationResponse,
)

from app.schemas.message import (
    MessageResponse,
)

from app.services.conversation_service import ConversationService
from app.services.message_service import MessageService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

UPLOAD_DIR = Path("/app/uploads")
MAX_UPLOAD_SIZE = 10 * 1024 * 1024


@router.post("/upload")
async def upload_chat_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="A file is required")

    suffix = Path(file.filename).suffix.lower()
    stored_name = f"{uuid4().hex}{suffix}"
    destination = UPLOAD_DIR / stored_name
    content = await file.read(MAX_UPLOAD_SIZE + 1)
    if len(content) > MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=413, detail="File must be 10 MB or smaller")

    destination.write_bytes(content)
    return {
        "url": f"/uploads/{stored_name}",
        "name": file.filename,
        "content_type": file.content_type or "application/octet-stream",
    }


@router.get(
    "/user/{user_id}/conversations",
    response_model=list[ConversationResponse],
)
def get_user_conversations(
    user_id: str,
    db: Session = Depends(get_db),
):
    service = ConversationService(db)
    return service.get_for_user(user_id)


# ------------------------------------
# Start Conversation
# ------------------------------------
@router.post(
    "/start",
    response_model=ConversationResponse,
)
def start_chat(
    request: ConversationCreate,
    db: Session = Depends(get_db),
):

    service = ConversationService(db)

    return service.get_or_create(
        product_id=request.product_id,
        buyer_id=request.buyer_id,
        seller_id=request.seller_id,
        buyer_name=request.buyer_name,
        buyer_avatar_url=request.buyer_avatar_url,
        seller_name=request.seller_name,
        seller_avatar_url=request.seller_avatar_url,
    )


# ------------------------------------
# Get Messages (Pagination)
# ------------------------------------
@router.get(
    "/{conversation_id}/messages",
    response_model=list[MessageResponse],
)
def get_messages(
    conversation_id: int,
    limit: int = Query(
        default=30,
        ge=1,
        le=100,
    ),
    offset: int = Query(
        default=0,
        ge=0,
    ),
    db: Session = Depends(get_db),
):

    service = MessageService(db)

    return service.get_messages(
        conversation_id=conversation_id,
        limit=limit,
        offset=offset,
    )