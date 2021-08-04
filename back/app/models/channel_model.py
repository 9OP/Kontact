from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import UUID
from app.models.database import db, Support
import uuid


class Channel(db.Model, Support):
    __tablename__ = "channel"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(255), nullable=False)
    members = association_proxy("memberships", "user")

    def __repr__(self):
        return "<channel: {}>".format(self.name)

    def summary(self, include_members=False):
        channel_data = self.serialize("id", "name", "created_at")
        if include_members:
            channel_data["members"] = [
                {**m.user.summary(), **m.serialize("role", "pending")}
                for m in self.memberships
            ]
        return channel_data
