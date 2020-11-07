import functools
from flask import request, g
from app.models import User, UserToken
import app.common.api_response as api_res


def authentication(func):

    # Flask context available only inside secure_function
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        if not request.headers.get("kt_token"):
            raise api_res.AuthError(description="Authentication token required.")

        token = UserToken.find(token=request.headers.get("kt_token"))
        if not token:
            raise api_res.AuthError(description="Authentication token not found.")

        uid = token.decode()
        g.current_user = User.find(id=uid)
        g.auth_token = token
        return func(*args, **kwargs)

    return secure_function
