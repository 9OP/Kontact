from flask import jsonify, request
from sqlalchemy.exc import IntegrityError

from app.api.helpers import validator
from app.models.user import User
from app.models.user_token import UserToken
from app.common.api_response import *


AUTH_SCHEMA = {
    "email": {
        "type": "string",
        "required": True,
        "maxlength": 255,
        "empty": False,
        "is_email": True,
        "coerce": "lowercase",
    },
    "password": {
        "type": "string",
        "required": True,
        "minlength": 6,
        "is_strong": True,
        "empty": False,
    },
}


def signup():
    params = validator(request.json, AUTH_SCHEMA)
    new_user = User.create(email=params["email"], password=params["password"])
    return jsonify(new_user.serialize("id", "email"))


def signin():
    params = validator(request.json, AUTH_SCHEMA)
    user = User.find(email=params["email"])

    if not user or not user.check_password(params["password"]):
        raise InvalidParameter("Email or password wrong.")

    token = UserToken.create(user_id=user.id).token
    data = user.serialize("id", "email")
    data.update({"token": str(token)})
    print(token)
    return jsonify(data)


def signout():
    return "signout"


def whoami():
    return "whoami"
