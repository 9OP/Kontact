from sqlalchemy.orm import backref
from sqlalchemy.dialects.postgresql import UUID
from app.models.database import db, Support
from enum import IntEnum


class Role(IntEnum):
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
        lazy=False,
        backref=backref(
            "user_memberships",
            lazy=False,
            cascade="all, delete-orphan",
        ),
    )

    channel = db.relationship(
        "Channel",
        lazy=False,
        backref=backref(
            "channel_memberships",
            lazy=False,
            cascade="all, delete-orphan",
        ),
    )

    def __repr__(self):
        return "<membership: <uid: {}, cid: {}>>".format(self.user_id, self.channel_id)

    def summary(self, source=None):
        switcher = {
            "user": self.user.summary(),
            "channel": self.channel.summary(),
        }
        membership_data = self.serialize("role", created_at="joined_at")
        membership_data.update(switcher.get(source, {}))
        return membership_data
