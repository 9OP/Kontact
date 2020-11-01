from datetime import datetime
from app.models import db, bcrypt


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    tokens = db.relationship("UserToken", backref="user", lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")
        self.registered_on = datetime.now()

    def __repr__(self):
        return "<user: {}>".format(self.email)

    def check_password(self, password):
        valid = bcrypt.check_password_hash(self.password, password)
        return valid
