import functools
from app.common.api_response import *  # better import Unauthorized


def authentication_required(func):
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        # if not UserToken.checkToken(response.header['kontact_token']):
        #     raise Unauthorized()
        return func(*args, **kwargs)

    return secure_function