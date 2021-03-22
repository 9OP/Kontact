import functools
from flask import request, g, session
from app.models import User, UserToken
from app.api.helpers import dec
import app.api_responses as apr


def authentication(func):
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        try:
            bearer = request.headers.get("Authorization").strip()
            enc_token = bearer.split()[-1]
            secret = session["token_secret"]
        except:
            raise apr.AuthError(description="Authentication token required.")

        token = dec(enc_token, secret)
        uid, tid = UserToken.decode(token)
        g.current_user = User.find_one(id=uid)
        g.auth_token = UserToken.find_one(id=tid)
        return func(*args, **kwargs)

    return secure_function
