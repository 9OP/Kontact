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

    def user_summary(self):
        user_data = self.user.serialize("id", "email", "name")
        user_data.update({"role": Role(self.role).name, "joined_at": self.created_at})
        return user_data

    def channel_summary(self):
        channel_data = self.channel.serialize("id", "name")
        channel_data["joined_at"] = self.created_at
        return channel_data
