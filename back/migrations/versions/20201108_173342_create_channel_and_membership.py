"""create_channel_and_membership

Revision ID: 519bb7abbd76
Revises: 2a60af59f650
Create Date: 2020-11-08 17:33:42.342809

"""
from alembic import op
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "519bb7abbd76"
down_revision = "2a60af59f650"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "channel",
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("id", UUID(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_channel")),
        sa.UniqueConstraint("name", name=op.f("uq_channel_name")),
    )
    op.create_table(
        "membership",
        sa.Column("role", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("user_id", UUID(), nullable=False),
        sa.Column("channel_id", UUID(), nullable=False),
        sa.Column("material", sa.JSON(), nullable=False),
        sa.ForeignKeyConstraint(
            ["channel_id"],
            ["channel.id"],
            name=op.f("fk_membership_channel_id_channel"),
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["user.id"], name=op.f("fk_membership_user_id_user")
        ),
        sa.PrimaryKeyConstraint("user_id", "channel_id", name=op.f("pk_membership")),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("membership")
    op.drop_table("channel")
    # ### end Alembic commands ###
