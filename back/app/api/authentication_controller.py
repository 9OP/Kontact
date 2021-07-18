from flask import request, g, session
from app.models import User, UserToken
from app.api.helpers import validator, render, key_gen
from app.api.middlewares import gate
import app.api_responses as apr

_EMAIL_SCHEMA = {
    "type": "string",
    "required": True,
    "maxlength": 255,
    "empty": False,
    "is_email": True,
    "coerce": "lowercase",
}
_PWD_SCHEMA = {"type": "string", "required": True}
_NAME_SCHEMA = {"type": "string", "required": True, "empty": False}

# Define the structure of encryption material
# puek: public user encryption key
# suek: secret user encryption key (stored encrypted with client-side password hash)
_MATERIAL_SCHEMA = {
    "puek": {"type": "string", "required": True, "empty": False},
    "suek": {"type": "string", "required": True, "empty": False},
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
        # "is_strong": True,
    },
    "name": _NAME_SCHEMA,
    "material": {
        "type": "dict",
        "schema": _MATERIAL_SCHEMA,
    },
}


def signup():
    params = validator(request.json, AUTH_SIGNUP_SCHEMA)
    new_user = User.create(
        email=params["email"],
        name=params["name"],
        password=params["password"],
        material=params["material"],
    )
    g.current_user = new_user
    user_data = new_user.summary()
    return render(user_data, code=201)


def signin():
    params = validator(request.json, AUTH_SIGNIN_SCHEMA)
    user = User.find(email=params["email"])

    if not user or not user.check_password(params["password"]):
        raise apr.LoginFailed()

    g.current_user = user

    token = UserToken.create(user_id=user.id).token
    user_data = user.summary()
    user_data["token"] = token
    session["user_id"] = user.id
    session["les_key"] = key_gen()
    return render(user_data)


@gate()
def signout():
    g.auth_token.revoke()
    session.clear()
    return render("Signout successfully.")


@gate(delegation=True)
def whoami():
    user_data = g.current_user.summary(verbose=True)
    return render(user_data)


def key():
    key = session.get("les_key")
    return render({"key": key})
