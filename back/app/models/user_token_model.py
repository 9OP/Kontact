import jwt
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timedelta
from app.models.database import db, Support
from config.settings import Config
import app.api_responses as apr
import uuid


class UserToken(db.Model, Support):
    __tablename__ = "user_token"

    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String, unique=True, nullable=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("user.id"), nullable=False)
    revoked_at = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        payload = {
            "exp": datetime.utcnow() + timedelta(seconds=Config.PAYLOAD_EXPIRATION),
            "iat": datetime.utcnow(),
            "uid": kwargs["user_id"].hex,  # convert UUID to hex
        }
        self.token = jwt.encode(
            payload,
            Config.SECRET_KEY,
            algorithm="HS512",
        ).decode("utf-8")

    def __repr__(self):
        return "<user_token: {}>".format(self.id)

    def decode(self):
        if self.revoked_at:
            raise apr.TokenExpired()
        try:
            payload = jwt.decode(
                self.token,
                Config.SECRET_KEY,
                algorithms="HS512",
                options={"require": ["exp", "iat", "uid"]},
            )
            return uuid.UUID(payload["uid"])  # convert hex to UUID
        except jwt.ExpiredSignatureError:
            raise apr.TokenExpired()
        except jwt.InvalidTokenError:  # default error jwt
            raise apr.TokenInvalid

    def revoke(self):
        self.update(revoked_at=datetime.utcnow())
