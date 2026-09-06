from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    ForeignKey,
    Index,
    String,
    Text,
    false,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base
from app.models.enums import MessageStatus, MessageType
from app.models.mixins import TimestampMixin


class Message(Base, TimestampMixin):
    __tablename__ = "messages"

    __table_args__ = (
        Index("ix_message_conversation", "conversation_id"),
        Index("ix_message_sender", "sender_id"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)

    conversation_id: Mapped[int] = mapped_column(
        ForeignKey("conversations.id", ondelete="CASCADE"),
        nullable=False,
    )

    sender_id: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    attachment_url: Mapped[str | None] = mapped_column(
        String(2048),
        nullable=True,
    )

    attachment_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    message_type: Mapped[MessageType] = mapped_column(
        Enum(
            MessageType,
            values_callable=lambda enum: [e.value for e in enum],
            name="message_type",
        ),
        default=MessageType.TEXT,
        nullable=False,
    )

    status: Mapped[MessageStatus] = mapped_column(
        Enum(
            MessageStatus,
            values_callable=lambda enum: [e.value for e in enum],
            name="message_status",
        ),
        default=MessageStatus.SENT,
        nullable=False,
    )

    edited_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    is_deleted: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        server_default=false(),
        nullable=False,
    )

    conversation: Mapped["Conversation"] = relationship(
        back_populates="messages",
    )