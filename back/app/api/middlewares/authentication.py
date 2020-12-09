import functools
from flask import request, g
from app.models import User, UserToken
import app.api_responses as apr


def authentication(func):
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        try:
            bearer = request.headers.get("Authorization").strip()
            token = bearer.split()[-1]
        except:
            raise apr.AuthError(description="Authentication token required.")

        uid, tid = UserToken.decode(token)
        g.current_user = User.find_one(id=uid)
        g.auth_token = UserToken.find_one(id=tid)
        return func(*args, **kwargs)

    return secure_function
