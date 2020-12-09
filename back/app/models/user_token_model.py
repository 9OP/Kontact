import jwt
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timedelta
from app.models.database import db, Support
from config.settings import Config
import app.api_responses as apr
import uuid


class UserToken(db.Model, Support):
    __tablename__ = "user_token"

    # id = db.Column(db.Integer, primary_key=True)
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # token = db.Column(db.String, unique=True, nullable=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("user.id"), nullable=False)
    revoked_at = db.Column(db.DateTime)

    # def __init__(self, **kwargs):
    #     super().__init__(**kwargs)

    def __repr__(self):
        return "<user_token: {}>".format(self.id)

    def encode(self):
        payload = {
            "exp": datetime.utcnow() + timedelta(seconds=Config.PAYLOAD_EXPIRATION),
            "iat": datetime.utcnow(),
            "uid": self.user_id.hex,  # user id
            "tid": self.id.hex,  # token id
        }
        return jwt.encode(
            payload,
            Config.SECRET_KEY,
            algorithm="HS512",
        ).decode("utf-8")

    @classmethod
    def decode(cls, token):
        try:
            payload = jwt.decode(
                token,
                Config.SECRET_KEY,
                algorithms="HS512",
                options={"require": ["exp", "iat", "uid", "tid"]},
            )
        except jwt.ExpiredSignatureError:
            raise apr.TokenExpired()
        except jwt.InvalidTokenError:  # default error jwt
            raise apr.TokenInvalid()
        else:
            uid = uuid.UUID(payload["uid"])
            tid = uuid.UUID(payload["tid"])

            if cls.find(id=tid).revoked_at:
                raise apr.TokenExpired()

            return (uid, tid)

    def revoke(self):
        self.update(revoked_at=datetime.utcnow())
