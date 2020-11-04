"""create_user_tokens

Revision ID: 1cc6d664f1e1
Revises: 0999b35948ec
Create Date: 2020-11-04 00:27:39.471291

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "1cc6d664f1e1"
down_revision = "0999b35948ec"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "user_token",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("token", sa.String(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("revoked_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("id"),
        sa.UniqueConstraint("token"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("user_token")
    # ### end Alembic commands ###
