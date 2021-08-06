from flask import g
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import UUID
from app.models.database import db, Support
from app.models.membership_model import Membership
from enum import IntEnum
import uuid
import hashlib
import bcrypt


class Access(IntEnum):
    GUEST = 0
    USER = 1
    ADMIN = 2


class User(db.Model, Support):
    __tablename__ = "user"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    access = db.Column(db.Enum(Access), nullable=False, default=Access.USER.value)
    material = db.Column(db.JSON, nullable=False)
    tokens = db.relationship("UserToken", backref="user", lazy=True)
    channels = association_proxy("memberships", "channel")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.password = User.hash_password(kwargs["password"]).decode("utf-8")

    def __repr__(self):
        return f"<{Access(self.access).name}, {self.email}, {self.name}>"

    @staticmethod
    def hash_password(password):
        digest = hashlib.sha256(password.encode("utf-8")).hexdigest()
        salt = bcrypt.gensalt(rounds=10)
        return bcrypt.hashpw(digest.encode("utf-8"), salt)

    def check_password(self, password):
        hashed = self.password.encode("utf-8")
        digest = hashlib.sha256(password.encode("utf-8")).hexdigest()
        return bcrypt.checkpw(digest.encode("utf-8"), hashed)

    def summary(self):
        return self.serialize("id", "email", "name", "access", _material="material")

    @hybrid_property
    def _material(self):
        if self == g.current_user:
            return self.material
        # Return only public material if self not current user
        public = ["puek"]
        return {k: v for k, v in self.material.items() if k in public}

    @hybrid_property
    def pending_memberships(self):
        return Membership.find_all(user_id=self.id, pending=True)
