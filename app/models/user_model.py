from sqlalchemy.ext.associationproxy import association_proxy
from app.models.database import db, bcrypt, Support


class User(db.Model, Support):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    tokens = db.relationship("UserToken", backref="user", lazy=True)
    channels = association_proxy("user_memberships", "channel")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        pwd = kwargs["password"]
        self.password = bcrypt.generate_password_hash(pwd, 10).decode("utf-8")

    def __repr__(self):
        return "<user: {}>".format(self.email)

    def summary(self):
        user_data = self.serialize("id", "email", "name")
        user_data["channels"] = [c.channel_summary() for c in self.user_memberships]
        return user_data

    def check_password(self, password):
        valid = bcrypt.check_password_hash(self.password, password)
        return valid
