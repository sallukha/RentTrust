"""add conversation participant metadata

Revision ID: 3f4d2c1e9b7a
Revises: 0c7c8a8f0a1d
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "3f4d2c1e9b7a"
down_revision: Union[str, Sequence[str], None] = "0c7c8a8f0a1d"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("conversations", sa.Column("buyer_name", sa.String(length=120), nullable=True))
    op.add_column("conversations", sa.Column("buyer_avatar_url", sa.String(length=2048), nullable=True))
    op.add_column("conversations", sa.Column("seller_name", sa.String(length=120), nullable=True))
    op.add_column("conversations", sa.Column("seller_avatar_url", sa.String(length=2048), nullable=True))


def downgrade() -> None:
    op.drop_column("conversations", "seller_avatar_url")
    op.drop_column("conversations", "seller_name")
    op.drop_column("conversations", "buyer_avatar_url")
    op.drop_column("conversations", "buyer_name")
