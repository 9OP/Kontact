from datetime import datetime
from app.common.database import db, bcrypt, GenericMixin, TimestampMixin


class User(db.Model, GenericMixin, TimestampMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    tokens = db.relationship("UserToken", backref="user", lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

    def __repr__(self):
        return "<user: {}>".format(self.email)

    def check_password(self, password):
        valid = bcrypt.check_password_hash(self.password, password)
        return valid
