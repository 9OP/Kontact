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
    material = db.Column(db.JSON)
    pending = db.Column(db.Boolean, nullable=False, default=False)
    role = db.Column(db.Enum(Role), nullable=False, default=Role.MEMBER.value)

    user = db.relationship(
        "User",
        backref=backref(
            "memberships",
            primaryjoin="and_(User.id==Membership.user_id, Membership.pending==False)",
        ),
    )

    channel = db.relationship(
        "Channel",
        backref=backref("memberships"),
    )

    def __repr__(self):
        return "<membership: <uid: {}, cid: {}>>".format(self.user_id, self.channel_id)

    def summary(self):
        return self.serialize("user_id", "channel_id", "role", "pending", "material")
