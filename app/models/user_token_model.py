import jwt
from datetime import datetime, timedelta
from app.models.database import db, Support
from app.config import Config
import app.api_responses as apr


class UserToken(db.Model, Support):
    __tablename__ = "user_token"

    id = db.Column(db.Integer, primary_key=True, unique=True)
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
                options={"require": ["exp", "iat", "uid"]},
                algorithms="HS512",
            )
            return payload["uid"]
        except jwt.ExpiredSignatureError:
            raise apr.TokenExpired()
        except jwt.InvalidTokenError:  # default error jwt
            raise apr.TokenInvalid

    def revoke(self):
        self.update(revoked_at=datetime.utcnow())
