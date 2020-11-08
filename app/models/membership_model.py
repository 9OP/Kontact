from app.models.database import db, Support


class Membership(db.Model, Support):
    __tablename__ = "membership"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channel.id"), primary_key=True)

    user = db.relationship("User", backref="memberships", lazy=True)
    channel = db.relationship("Channel", backref="memberships", lazy=True)

    def __repr__(self):
        return "<membership: {}>".format(self.id)
