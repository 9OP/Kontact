import jwt
import uuid
from datetime import datetime, timedelta
from app.common.database import db, Support, GUID
from app.config import Config
import app.common.api_response as api_res


class UserToken(db.Model, Support):
    __tablename__ = "user_token"

    id = db.Column(GUID(), primary_key=True, unique=True, default=uuid.uuid4)
    token = db.Column(db.String, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    revoked_at = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        payload = {
            "exp": datetime.utcnow() + timedelta(seconds=Config.PAYLOAD_EXPIRATION),
            "iat": datetime.utcnow(),
            "uid": kwargs["user_id"],
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
            raise api_res.TokenExpired()
        try:
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms="HS256")
            return payload["uid"]
        except jwt.ExpiredSignatureError:
            raise api_res.SignatureExpired()
        except jwt.InvalidTokenError:
            raise api_res.TokenExpired()

    def revoke(self):
        self.update(revoked_at=datetime.utcnow())
