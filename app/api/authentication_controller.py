from flask import jsonify, request
from sqlalchemy.exc import IntegrityError

from app.api.helpers import validator, authentication_required
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
        "empty": False,
        "is_strong": True,
    },
}


def signup():
    params = validator(request.json, AUTH_SCHEMA)
    new_user = User.create(email=params["email"], password=params["password"])
    user_data = new_user.serialize("id", "email")
    return jsonify(user_data)


def signin():
    params = validator(request.json, AUTH_SCHEMA)
    user = User.find(email=params["email"])

    if not user or not user.check_password(params["password"]):
        raise InvalidParameter("Email or password wrong.")

    # If token is provided invalidated it
    token = UserToken.create(user_id=user.id).token
    user_data = user.serialize("id", "email")
    user_data["token"] = token
    return jsonify(user_data)


def signout():
    # Invalidate current token
    return "signout"


@authentication_required
def whoami():
    return "whoami"
