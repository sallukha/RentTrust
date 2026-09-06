from sqlalchemy.orm import Session

from app.models.conversation import Conversation
from app.repositories.conversation_repository import ConversationRepository


class ConversationService:

    def __init__(self, db: Session):
        self.repository = ConversationRepository(db)

    def get_or_create(
        self,
        product_id: str,
        buyer_id: str,
        seller_id: str,
        buyer_name: str | None = None,
        buyer_avatar_url: str | None = None,
        seller_name: str | None = None,
        seller_avatar_url: str | None = None,
    ) -> Conversation:

        conversation = self.repository.get_by_product_and_buyer(
            product_id,
            buyer_id,
        )

        if conversation:
            return self.repository.update_metadata(
                conversation,
                buyer_name,
                buyer_avatar_url,
                seller_name,
                seller_avatar_url,
            )

        return self.repository.create(
            product_id,
            buyer_id,
            seller_id,
            buyer_name,
            buyer_avatar_url,
            seller_name,
            seller_avatar_url,
        )

    def get_by_id(
        self,
        conversation_id: int,
    ):
        return self.repository.get_by_id(conversation_id)

    def get_for_user(self, user_id: str) -> list[Conversation]:
        return self.repository.get_by_user(user_id)