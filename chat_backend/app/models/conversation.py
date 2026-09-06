from datetime import datetime

from sqlalchemy import DateTime, Index, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base
from app.models.mixins import TimestampMixin


class Conversation(Base, TimestampMixin):
    __tablename__ = "conversations"

    __table_args__ = (
        UniqueConstraint(
            "product_id",
            "buyer_id",
            name="uq_product_buyer",
        ),
        Index("ix_conversation_product", "product_id"),
        Index("ix_conversation_buyer", "buyer_id"),
        Index("ix_conversation_seller", "seller_id"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)

    product_id: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
    )

    buyer_id: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
    )

    seller_id: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
    )

    buyer_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    buyer_avatar_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)
    seller_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    seller_avatar_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)

    last_message_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    messages: Mapped[list["Message"]] = relationship(
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="Message.created_at",
    )