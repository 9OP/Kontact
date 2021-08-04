from flask import g
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import UUID
from app.models.database import db, Support
from app.models.membership_model import Membership
import uuid


class Channel(db.Model, Support):
    __tablename__ = "channel"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(255), nullable=False)
    members = association_proxy("memberships", "user")

    def __repr__(self):
        return "<channel: {}>".format(self.name)

    def summary(self):
        channel_data = self.serialize("id", "name", "created_at", _material="material")
        channel_data["members"] = [
            {**m.user.summary(), **m.serialize("role")} for m in self.memberships
        ]
        return channel_data

    @hybrid_property
    def _material(self):
        # not optimized
        membership = Membership.find(user_id=g.current_user.id, channel_id=self.id)
        if membership:
            return membership.material  # scek, salt, iv
