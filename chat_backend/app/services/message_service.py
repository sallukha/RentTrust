from sqlalchemy.orm import Session

from app.repositories.message_repository import MessageRepository
from app.repositories.conversation_repository import ConversationRepository


class MessageService:

    def __init__(self, db: Session):
        self.message_repository = MessageRepository(db)
        self.conversation_repository = ConversationRepository(db)

    # ----------------------------
    # Send Message
    # ----------------------------
    def send_message(
        self,
        conversation_id: int,
        sender_id: str,
        message: str,
        message_type,
        attachment_url: str | None = None,
        attachment_name: str | None = None,
    ):

        saved_message = self.message_repository.create(
            conversation_id=conversation_id,
            sender_id=sender_id,
            message=message,
            message_type=message_type,
            attachment_url=attachment_url,
            attachment_name=attachment_name,
        )

        conversation = self.conversation_repository.get_by_id(
            conversation_id
        )

        if conversation is None:
            raise Exception("Conversation not found")

        if sender_id == conversation.buyer_id:
            receiver_id = conversation.seller_id
        elif sender_id == conversation.seller_id:
            receiver_id = conversation.buyer_id
        else:
            raise ValueError("User is not a participant in this conversation")

        return saved_message, receiver_id

    # ----------------------------
    # Get Messages (Pagination)
    # ----------------------------
    def get_messages(
        self,
        conversation_id: int,
        limit: int = 30,
        offset: int = 0,
    ):

        return self.message_repository.get_by_conversation(
            conversation_id,
            limit,
            offset,
        )

    # ----------------------------
    # Update Status
    # ----------------------------
    def update_status(
        self,
        message_id: int,
        status,
    ):

        return self.message_repository.update_status(
            message_id,
            status,
        )