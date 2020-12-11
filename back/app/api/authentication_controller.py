from flask import request, g, session
from app.models import User, UserToken
from app.api.helpers import validator, render, encrypt, decrypt
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
    return render(user_data, code=201)


def signin():
    params = validator(request.json, AUTH_SIGNIN_SCHEMA)
    user = User.find(email=params["email"])

    if not user or not user.check_password(params["password"]):
        raise apr.LoginFailed()

    token = UserToken.create(user_id=user.id)
    user_data = user.summary()
    user_data["token"] = token.encode()
    session["token"] = token.id
    return render(user_data)

    # cookie = {
    #     "key": "csrf",
    #     "value": encrypt(str(token.id)),
    #     "httponly": True,
    # }


@authentication
def signout():
    g.auth_token.revoke()
    return render("Signout successfully.")


@authentication
def whoami():
    user_data = g.current_user.summary()
    return render(user_data)


def key():
    # csrf = request.cookies.get("csrf")
    token = UserToken.find_one(id=session["token"])
    return render({"key": token.key})
