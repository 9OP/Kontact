from app.common.database import db, bcrypt, Support


class User(db.Model, Support):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    tokens = db.relationship("UserToken", backref="user", lazy=True)

    def __init__(self, password, **kwargs):
        super().__init__(**kwargs)
        self.password = bcrypt.generate_password_hash(password, 10).decode("utf-8")

    def __repr__(self):
        return "<user: {}>".format(self.email)

    def check_password(self, password):
        valid = bcrypt.check_password_hash(self.password, password)
        return valid
