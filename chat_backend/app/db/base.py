from sqlalchemy.orm import DeclarativeBase

from app.db.base_class import Base


class Base(DeclarativeBase):
    pass


from app.models.conversation import Conversation
from app.models.message import Message