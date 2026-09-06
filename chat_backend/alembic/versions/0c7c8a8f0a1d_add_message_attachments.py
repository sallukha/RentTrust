"""add message attachments

Revision ID: 0c7c8a8f0a1d
Revises: 77902d4ac728
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0c7c8a8f0a1d"
down_revision: Union[str, Sequence[str], None] = "77902d4ac728"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("messages", sa.Column("attachment_url", sa.String(length=2048), nullable=True))
    op.add_column("messages", sa.Column("attachment_name", sa.String(length=255), nullable=True))


def downgrade() -> None:
    op.drop_column("messages", "attachment_name")
    op.drop_column("messages", "attachment_url")