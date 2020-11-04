import functools
from flask import request, g
from app.models import User, UserToken
import app.common.api_response as api_res


def authentication(func):

    # Flask context available only inside secure_function
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        kt_token = request.headers.get("kt_token")

        if not kt_token:
            raise api_res.AuthError(description="Authentication token missing.")

        uid = UserToken.decode(kt_token)
        g.current_user = User.find(id=uid)
        g.auth_token = kt_token
        return func(*args, **kwargs)

    return secure_function
