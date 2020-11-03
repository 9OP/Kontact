import jwt
from datetime import datetime, timedelta

from app.common.database import db, GenericMixin
from app.config import Config
from app.common.api_response import *


class UserToken(db.Model, GenericMixin):
    __tablename__ = "user_token"
    __protected__ = ["token"]

    id = db.Column(db.Integer, primary_key=True, unique=True)
    token = db.Column(db.String, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    revoked_at = db.Column(db.DateTime)

    def __init__(self, user_id):
        GenericMixin.__init__(self)
        self.created_at = datetime.utcnow()
        self.user_id = user_id
        payload = {
            "exp": datetime.utcnow() + timedelta(seconds=Config.PAYLOAD_EXPIRATION),
            "iat": datetime.utcnow(),
            "uid": user_id,
        }
        self.token = jwt.encode(
            payload,
            Config.SECRET_KEY,
            algorithm="HS256",
        ).decode("utf-8")

    def __repr__(self):
        return "<user_token: {}>".format(self.id)

    @classmethod
    def decode(cls, token):
        if cls.find(token=token).revoked_at:
            raise TokenExpired()
        try:
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms="HS256")
            return payload["uid"]
        except jwt.ExpiredSignatureError:
            raise SignatureExpired()
        except jwt.InvalidTokenError:
            raise TokenExpired()

    def revoke(self):
        self.update(revoked_at=datetime.utcnow())
