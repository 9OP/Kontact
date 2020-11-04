from flask import jsonify, request, g
from app.api.helpers import validator, authentication, api_render
from app.models import User, UserToken
import app.common.api_response as api_res


AUTH_SIGNIN_SCHEMA = {
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

AUTH_SIGNUP_SCHEMA = {
    **AUTH_SIGNIN_SCHEMA,
    **{"name": {"type": "string", "required": True, "empty": False}},
}


def signup():
    params = validator(request.json, AUTH_SIGNUP_SCHEMA)
    new_user = User.create(
        email=params["email"],
        name=params["name"],
        password=params["password"],
    )
    print("hello")
    user_data = new_user.serialize("id", "email", "name")
    user_data["token"] = UserToken.create(user_id=new_user.id).token
    return api_render(user_data)


def signin():
    params = validator(request.json, AUTH_SIGNIN_SCHEMA)
    user = User.find(email=params["email"])

    if not user or not user.check_password(params["password"]):
        raise api_res.InvalidParameter("Email or password wrong.")

    user_data = user.serialize("id", "email", "name")
    user_data["token"] = UserToken.create(user_id=user.id).token
    return api_render(user_data)


@authentication
def signout():
    UserToken.find(token=g.kt_token).revoke()
    return api_render("Signout successfully.")


@authentication
def whoami():
    user_data = g.current_user.serialize("id", "email", "name")
    return api_render(user_data)
