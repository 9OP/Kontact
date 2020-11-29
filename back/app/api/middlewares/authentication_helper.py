import functools
from flask import request, g
from app.models import User, UserToken
import app.api_responses as apr


def authentication(func):
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        if not request.headers.get("kt_token"):
            raise apr.AuthError(description="Authentication token required.")

        token = UserToken.find(token=request.headers.get("kt_token"))
        if not token:
            raise apr.TokenInvalid()

        uid = token.decode()
        g.current_user = User.find(id=uid)
        g.auth_token = token
        return func(*args, **kwargs)

    return secure_function
