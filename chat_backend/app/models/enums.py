from enum import Enum


class MessageType(str, Enum):
    TEXT = "text"
    IMAGE = "image"
    VIDEO = "video"
    AUDIO = "audio"
    FILE = "file"


class MessageStatus(str, Enum):
    SENT = "sent"
    DELIVERED = "delivered"
    SEEN = "seen"