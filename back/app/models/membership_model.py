from sqlalchemy.orm import backref
from sqlalchemy.dialects.postgresql import UUID
from app.models.database import db, Support
from enum import Enum


class Role(Enum):
    MEMBER = 0
    MASTER = 1


class Membership(db.Model, Support):
    __tablename__ = "membership"

    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("user.id"), primary_key=True)
    channel_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("channel.id"), primary_key=True
    )
    role = db.Column(db.Integer, nullable=False, default=Role.MEMBER.value)

    user = db.relationship(
        "User",
        backref=backref(
            "user_memberships",
            cascade="all, delete-orphan",
        ),
    )
    channel = db.relationship(
        "Channel",
        backref=backref(
            "channel_memberships",
            cascade="all, delete-orphan",
        ),
    )

    def __repr__(self):
        return "<membership: <uid: {}, cid: {}>>".format(self.user_id, self.channel_id)

    def summary(self, source=None):
        switcher = {
            "user": self.user.serialize("id", "name", "email"),
            "channel": self.channel.serialize("id", "name"),
        }
        membership_data = self.serialize("role", created_at="joined_at")
        membership_data.update(switcher.get(source, {}))
        return membership_data
