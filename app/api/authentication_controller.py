from flask import jsonify, request
from app.api.helpers import validator as v
from app.models import db
from app.models.user import User
from app.models.user_token import UserToken
from app.common.errors import *


AUTH_SCHEMA = {
    "email": {"type": "string", "required": True},
    "password": {"type": "string", "required": True},
}


# Raise error instead of formating error reponse
def signup():
    user = v.validator(request.json, AUTH_SCHEMA)
    existing_user = User.query.filter_by(email=user.get("email")).first()

    # Create new user on a function, do not use db here
    if not existing_user:
        new_user = User(email=user.get("email"), password=user.get("password"))
        db.session.add(new_user)
        db.session.commit()
        return jsonify(success=True)
    else:
        raise ResourceAlreadyExists("user")


def signin():
    user = v.validator(request.json, AUTH_SCHEMA)
    existing_user = User.query.filter_by(email=user.get("email")).first()

    if not existing_user or not existing_user.check_password(user.get("password")):
        raise InvalidParameter("email or password wrong")

    token = UserToken(user_id=existing_user.id)
    db.session.add(token)
    db.session.commit()

    print(existing_user.serialize())

    return token.token


def signout():
    return "signout"


def whoami():
    return "whoami"
