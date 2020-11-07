from flask import Blueprint
from werkzeug.exceptions import HTTPException
from app.api.authentication_controller import signup, signin, signout, whoami
from app.api.helpers import handler, expect_mimetype
from app.api_responses import (
    ApiError,
    AuthError,
    AccessError,
    AlreadyExists,
    InvalidParameter,
    TokenInvalid,
    TokenExpired,
)

# Register custom errors
api = Blueprint("api", __name__)
api.app_errorhandler(ApiError)(handler)
api.app_errorhandler(AuthError)(handler)
api.app_errorhandler(AccessError)(handler)
api.app_errorhandler(AlreadyExists)(handler)
api.app_errorhandler(InvalidParameter)(handler)
api.app_errorhandler(TokenInvalid)(handler)
api.app_errorhandler(TokenExpired)(handler)

# Application wide
api.app_errorhandler(HTTPException)(handler)
api.before_app_request(expect_mimetype)

# [Authentication] blueprint
auth_api = Blueprint("auth_api", __name__)
auth_api.route("/auth/signup", methods=["POST"])(signup)
auth_api.route("/auth/signin", methods=["POST"])(signin)
auth_api.route("/auth/signout", methods=["POST"])(signout)
auth_api.route("/auth/whoami", methods=["GET"])(whoami)

# User
# user_api = Blueprint("user_api", __name__)
# user_api.route("/user/change_password", methods=["POST"])(change_password)
# user_api.route("/user/forgot_password", methods=["POST"])(forgot_password)

# Channel
# channel_api = Blueprint("channel_api", __name__)
