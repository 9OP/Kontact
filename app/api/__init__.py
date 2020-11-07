from flask import Blueprint, request
from app.api.authentication_controller import signup, signin, signout, whoami
from app.common.api_response import (
    ApiError,
    AuthError,
    # NoRouteMatch,
    # ResourceNotFound,
    ResourceAlreadyExists,
    # MissingParameter,
    InvalidParameter,
    InvalidContentType,
    TokenExpired,
    SignatureExpired,
    api_handler,
)


def check_mimetype_json():
    method = request.method
    mimetype = request.headers.get("Content-Type")
    if mimetype != "application/json" and method in ["POST", "PUT", "DELETE"]:
        raise InvalidContentType("application/json")


# Register custom errors
api = Blueprint("api", __name__)
api.app_errorhandler(ApiError)(api_handler)
api.app_errorhandler(AuthError)(api_handler)
# api.app_errorhandler(NoRouteMatch)(api_handler)
# api.app_errorhandler(ResourceNotFound)(api_handler)
api.app_errorhandler(ResourceAlreadyExists)(api_handler)
# api.app_errorhandler(MissingParameter)(api_handler)
api.app_errorhandler(InvalidParameter)(api_handler)
api.app_errorhandler(InvalidContentType)(api_handler)
api.app_errorhandler(TokenExpired)(api_handler)
api.app_errorhandler(SignatureExpired)(api_handler)

api.before_app_request(check_mimetype_json)

# Authentication
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
