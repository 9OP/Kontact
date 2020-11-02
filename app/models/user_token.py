import jwt
from datetime import datetime, timedelta

from app.common.database import db, GenericMixin
from app.common.api_response import *


class UserToken(db.Model, GenericMixin):
    __tablename__ = "user_token"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    token = db.Column(db.String, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    revoked_at = db.Column(db.DateTime)

    def __init__(self, user_id):
        self.created_at = datetime.utcnow()
        self.user_id = user_id
        payload = {
            "exp": datetime.utcnow()
            + timedelta(seconds=3600),  # CONFIG.PAYLOAD_EXPIRATION
            "iat": datetime.utcnow(),
            "uid": user_id,
        }
        self.token = jwt.encode(payload, "123", algorithm="HS256")

    def __repr__(self):
        return "<user_token: {}>".format(self.id)

    def decode(self):
        try:
            payload = jwt.decode(self.token, "123", algorithms="HS256")
            uid = payload["uid"]
            return uid
        except jwt.ExpiredSignatureError:
            raise SignatureExpired()
        except jwt.InvalidTokenError:
            raise TokenExpired()
