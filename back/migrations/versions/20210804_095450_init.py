"""init

Revision ID: f218f0f0536e
Revises:
Create Date: 2021-08-04 09:54:50.868970

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "f218f0f0536e"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "channel",
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_channel")),
    )
    op.create_table(
        "user",
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("password", sa.String(length=255), nullable=False),
        sa.Column(
            "access", sa.Enum("GUEST", "USER", "ADMIN", name="access"), nullable=False
        ),
        sa.Column("material", sa.JSON(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_user")),
        sa.UniqueConstraint("email", name=op.f("uq_user_email")),
    )
    op.create_table(
        "membership",
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("channel_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("material", sa.JSON(), nullable=True),
        sa.Column("pending", sa.Boolean(), nullable=False),
        sa.Column("role", sa.Enum("MEMBER", "MASTER", name="role"), nullable=False),
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
    op.create_table(
        "user_token",
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("token", sa.String(length=64), nullable=False),
        sa.Column("revoked_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"], ["user.id"], name=op.f("fk_user_token_user_id_user")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_user_token")),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("user_token")
    op.drop_table("membership")
    op.drop_table("user")
    op.drop_table("channel")
    # ### end Alembic commands ###