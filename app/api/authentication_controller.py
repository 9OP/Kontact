from flask import jsonify, request
from sqlalchemy.exc import IntegrityError

from app.api.helpers import validator as v
from app.models import db
from app.models.user import User
from app.models.user_token import UserToken
from app.common.errors import *


AUTH_SCHEMA = {
    "email": {"type": "string", "required": True},
    "password": {"type": "string", "required": True},
    "test": {
        "type": "dict",
        "schema": {
            "sub1": {"type": "integer"},
            "sub2": {"type": "integer"},
        },
    },
}


def signup():
    params = v.validator(request.json, AUTH_SCHEMA)
    new_user = User.create(email=params["email"], password=params["password"])
    return jsonify(new_user.serialize("id", "email"))


def signin():
    user = v.validator(request.json, AUTH_SCHEMA)
    # print(user)
    existing_user = User.query.filter_by(email=user.get("email")).first()

    if not existing_user or not existing_user.check_password(user.get("password")):
        raise InvalidParameter("email or password wrong")

    token = UserToken(user_id=existing_user.id)
    db.session.add(token)
    db.session.commit()

    # print("Serialize: ", existing_user.serialize("id", "email", "created"))

    return token.token


def signout():
    return "signout"


def whoami():
    return "whoami"
