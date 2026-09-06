from pydantic import BaseModel, ConfigDict, Field


class ConversationCreate(BaseModel):
    product_id: str = Field(min_length=1, max_length=64)
    buyer_id: str = Field(min_length=1, max_length=64)
    seller_id: str = Field(min_length=1, max_length=64)
    buyer_name: str | None = Field(default=None, max_length=120)
    buyer_avatar_url: str | None = Field(default=None, max_length=2048)
    seller_name: str | None = Field(default=None, max_length=120)
    seller_avatar_url: str | None = Field(default=None, max_length=2048)


class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: str
    buyer_id: str
    seller_id: str
    buyer_name: str | None = None
    buyer_avatar_url: str | None = None
    seller_name: str | None = None
    seller_avatar_url: str | None = None