from flask import request, g
from app.models import User, UserToken
from app.api.helpers import validator, render
from app.api.middlewares import authentication
import app.api_responses as apr

_EMAIL_SCHEMA = {
    "type": "string",
    "required": True,
    "maxlength": 255,
    "empty": False,
    "is_email": True,
    "coerce": "lowercase",
}
_PWD_SCHEMA = {
    "type": "string",
    "required": True,
}
_NAME_SCHEMA = {
    "type": "string",
    "required": True,
    "empty": False,
}

AUTH_SIGNIN_SCHEMA = {
    "email": _EMAIL_SCHEMA,
    "password": _PWD_SCHEMA,
}
AUTH_SIGNUP_SCHEMA = {
    "email": _EMAIL_SCHEMA,
    "password": {
        **_PWD_SCHEMA,
        "minlength": 6,
        "empty": False,
        "is_strong": True,
    },
    "name": _NAME_SCHEMA,
}


def signup():
    params = validator(request.json, AUTH_SIGNUP_SCHEMA)
    new_user = User.create(
        email=params["email"],
        name=params["name"],
        password=params["password"],
    )
    user_data = new_user.summary()
    user_data["token"] = UserToken.create(user_id=new_user.id).token
    return render(user_data, code=201)


def signin():
    params = validator(request.json, AUTH_SIGNIN_SCHEMA)
    user = User.find(email=params["email"])

    if not user or not user.check_password(params["password"]):
        raise apr.LoginFailed()

    user_data = user.summary()
    user_data["token"] = UserToken.create(user_id=user.id).token
    return render(user_data)


def signout():
    token = UserToken.find(token=request.headers.get("kt_token"))
    if token:
        token.revoke()
    return render("Signout successfully.")


@authentication
def whoami():
    user_data = g.current_user.summary()
    return render(user_data)
