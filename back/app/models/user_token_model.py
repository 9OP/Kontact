from os import urandom
from base64 import b64encode
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timedelta
from app.models.database import db, Support
from config.settings import Config
import app.api_responses as apr

# from app.api.helpers import key_gen


class UserToken(db.Model, Support):
    __tablename__ = "user_token"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("user.id"), nullable=False)
    token = db.Column(db.String(64), nullable=False)
    revoked_at = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.token = b64encode(urandom(48)).decode()  # 48 bytes -> 64 len string

    def __repr__(self):
        return "<user_token: {}>".format(self.id)

    @classmethod
    def decode(cls, token):
        instance = cls.find(token=token)

        if not instance:
            raise apr.TokenInvalid()

        if instance.revoked_at or (
            datetime.utcnow() - timedelta(seconds=Config.TOKEN_EXPIRATION)
            > instance.created_at
        ):
            raise apr.TokenExpired()

        return (instance.user_id, instance.id)

    def revoke(self):
        self.update(revoked_at=datetime.utcnow())
