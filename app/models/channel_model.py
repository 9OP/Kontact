from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from app.models.database import db, Support


class Channel(db.Model, Support):
    __tablename__ = "channel"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    members = association_proxy("channel_memberships", "user")
    # creator=lambda user: Membership(user=user)

    def __repr__(self):
        return "<channel: {}>".format(self.id)

    def summary(self):
        return self.serialize("id", "name", "created_at", "members_count")

    @hybrid_property
    def members_count(self):
        return len(self.members)
