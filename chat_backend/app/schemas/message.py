from datetime import datetime

from pydantic import BaseModel, Field

from app.models.enums import MessageStatus, MessageType


class MessageCreate(BaseModel):
    conversation_id: int
    sender_id: str = Field(min_length=1, max_length=64)
    message: str = Field(min_length=1)
    message_type: MessageType = MessageType.TEXT
    attachment_url: str | None = None
    attachment_name: str | None = None


class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    sender_id: str
    message: str
    message_type: MessageType
    status: MessageStatus
    created_at: datetime
    attachment_url: str | None = None
    attachment_name: str | None = None

    model_config = {
        "from_attributes": True
    }