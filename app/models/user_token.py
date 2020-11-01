import jwt
from datetime import datetime, timedelta
from app.models import db, bcrypt, CONFIG


class UserToken(db.Model):
    __tablename__ = "user_token"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    token = db.Column(db.String, unique=True, nullable=False)
    revoked_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __init__(self, user_id):
        self.email = email
        self.created_at = datetime.now()
        self.user_id = user_id
        payload = {
            "exp": datetime.utcnow() + timedelta(seconds=CONFIG.PAYLOAD_EXPIRATION),
            "iat": datetime.utcnow(),
            "uid": user_id,
        }
        self.token = jwt.encode(payload, CONFIG.SECRET_KEY, algorithm="HS256")

    def __repr__(self):
        return "<user_token: {}>".format(self.id)

    def decode(self):
        try:
            payload = jwt.decode(self.token, CONFIG.SECRET_KEY, algorithms="HS256")
            uid = payload["uid"]
            return uid
        # Raise custom http error
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."
