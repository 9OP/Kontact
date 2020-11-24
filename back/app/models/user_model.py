from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import UUID
from werkzeug.security import safe_str_cmp
from app.models.database import db, Support
from enum import Enum
import uuid
import hashlib
import bcrypt


class Access(Enum):
    GUEST = 0
    USER = 1
    ADMIN = 2


class User(db.Model, Support):
    __tablename__ = "user"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    access = db.Column(db.Integer, nullable=False, default=Access.USER.value)
    tokens = db.relationship("UserToken", backref="user", lazy=True)
    channels = association_proxy("user_memberships", "channel")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.password = User.hash_password(kwargs["password"]).decode("utf-8")

    def __repr__(self):
        return "<user: {}>".format(self.email)

    @staticmethod
    def hash_password(password):
        digest = hashlib.sha256(password.encode("utf-8")).hexdigest()
        salt = bcrypt.gensalt(rounds=10)
        return bcrypt.hashpw(digest.encode("utf-8"), salt)

    def check_password(self, password):
        hashed = self.password.encode("utf-8")
        digest = hashlib.sha256(password.encode("utf-8")).hexdigest()
        return bcrypt.checkpw(digest.encode("utf-8"), hashed)

    def short(self):
        user_data = self.serialize("id", "email", "name", "channels_count")
        user_data["access"] = Access(self.access).name
        return user_data

    def summary(self):
        user_data = self.serialize("id", "email", "name")
        user_data["access"] = Access(self.access).name
        user_data["channels"] = [c.channel_summary() for c in self.user_memberships]
        return user_data

    @hybrid_property
    def channels_count(self):
        return len(self.channels)
