from sqlalchemy.orm import backref
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import UUID
from app.models.database import db, Support
import uuid


class Channel(db.Model, Support):
    __tablename__ = "channel"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(255), unique=True, nullable=False)
    members = association_proxy("channel_memberships", "user")

    def __repr__(self):
        return "<channel: {}>".format(self.name)

    def summary(self, verbose=False):
        channel_data = self.serialize("id", "name", "created_at", "members_count")
        if verbose:
            members = [c.summary("user") for c in self.channel_memberships]
            channel_data["members"] = members
        return channel_data

    @hybrid_property
    def members_count(self):
        return len(self.members)
