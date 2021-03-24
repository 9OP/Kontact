from flask import Blueprint
from werkzeug.exceptions import HTTPException
from app.api.helpers import handler, expect_mimetype, expect_referer
from app.api_responses import (
    ApiError,
    AuthError,
    AccessError,
    AlreadyExists,
    InvalidParameter,
    NotFound,
    LoginFailed,
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
api.app_errorhandler(NotFound)(handler)
api.app_errorhandler(LoginFailed)(handler)
api.app_errorhandler(TokenInvalid)(handler)
api.app_errorhandler(TokenExpired)(handler)

# Application wide
api.app_errorhandler(HTTPException)(handler)
api.before_app_request(expect_referer)
api.before_app_request(expect_mimetype)


# [Authentication] blueprint
import app.api.authentication_controller as auth

auth_api = Blueprint("auth_api", __name__, url_prefix="/auth")
auth_api.route("/signup", methods=["POST"])(auth.signup)
auth_api.route("/signin", methods=["POST"])(auth.signin)
auth_api.route("/signout", methods=["POST"])(auth.signout)
auth_api.route("/whoami", methods=["GET"])(auth.whoami)
auth_api.route("/key", methods=["GET"])(auth.key)
# auth_api.route("/change_password", methods=["POST"])(change_password)
# auth_api.route("/forgot_password", methods=["POST"])(forgot_password)


# [User] blueprint
import app.api.user_controller as user

user_api = Blueprint("user_api", __name__, url_prefix="/user")
user_api.route("", methods=["GET"])(user.index)
user_api.route("/<uid>", methods=["GET"])(user.show)
user_api.route("/search", methods=["GET"])(user.search)


# [Channel] blueprint
import app.api.channel_controller as channel

channel_api = Blueprint("channel_api", __name__, url_prefix="/channel")
channel_api.route("", methods=["POST"])(channel.new)
channel_api.route("", methods=["GET"])(channel.index)
channel_api.route("/<cid>", methods=["GET"])(channel.show)
channel_api.route("/<cid>", methods=["DELETE"])(channel.destroy)
channel_api.route("/memberships", methods=["GET"])(channel.memberships)
channel_api.route("/<cid>", methods=["PUT"])(channel.update)
channel_api.route("/<cid>/membership/<uid>", methods=["POST"])(channel.add_member)
channel_api.route("/<cid>/membership/<uid>", methods=["DELETE"])(channel.delete_member)
channel_api.route("/<cid>/membership/<uid>", methods=["PUT"])(channel.update_member)
