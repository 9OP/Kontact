import functools
from flask import request
from app.models.user import User
from app.models.user_token import UserToken
from app.common.api_response import *


def authentication_required(func):

    # Flask context available only inside secure_function
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        kt_token = request.headers.get("kt_token")

        if not kt_token:
            raise AuthError(description="Authentication token missing.")

        uid = UserToken.decode(kt_token)
        current_user = User.find(id=uid)
        # print(current_user)
        return func(*args, **kwargs)

    return secure_function
