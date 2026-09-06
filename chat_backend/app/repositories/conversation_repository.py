from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.conversation import Conversation


class ConversationRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_product_and_buyer(
        self,
        product_id: str,
        buyer_id: str,
    ) -> Conversation | None:
        return (
            self.db.query(Conversation)
            .filter(
                Conversation.product_id == product_id,
                Conversation.buyer_id == buyer_id,
            )
            .first()
        )

    def create(
        self,
        product_id: str,
        buyer_id: str,
        seller_id: str,
        buyer_name: str | None = None,
        buyer_avatar_url: str | None = None,
        seller_name: str | None = None,
        seller_avatar_url: str | None = None,
    ) -> Conversation:

        conversation = Conversation(
            product_id=product_id,
            buyer_id=buyer_id,
            seller_id=seller_id,
            buyer_name=buyer_name,
            buyer_avatar_url=buyer_avatar_url,
            seller_name=seller_name,
            seller_avatar_url=seller_avatar_url,
        )

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation

    def get_by_id(
        self,
        conversation_id: int,
    ):
        return (
            self.db.query(Conversation)
            .filter(
                Conversation.id == conversation_id
            )
            .first()
        )

    def get_by_user(self, user_id: str) -> list[Conversation]:
        return (
            self.db.query(Conversation)
            .filter(
                or_(
                    Conversation.buyer_id == user_id,
                    Conversation.seller_id == user_id,
                )
            )
            .order_by(Conversation.last_message_at.desc().nullslast(), Conversation.created_at.desc())
            .all()
        )

    def update_metadata(
        self,
        conversation: Conversation,
        buyer_name: str | None = None,
        buyer_avatar_url: str | None = None,
        seller_name: str | None = None,
        seller_avatar_url: str | None = None,
    ) -> Conversation:
        conversation.buyer_name = buyer_name or conversation.buyer_name
        conversation.buyer_avatar_url = buyer_avatar_url or conversation.buyer_avatar_url
        conversation.seller_name = seller_name or conversation.seller_name
        conversation.seller_avatar_url = seller_avatar_url or conversation.seller_avatar_url
        self.db.commit()
        self.db.refresh(conversation)
        return conversation