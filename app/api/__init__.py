from flask import Blueprint
from werkzeug.exceptions import HTTPException
from app.api.helpers import handler, expect_mimetype
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
api.before_app_request(expect_mimetype)


# [Authentication] blueprint
import app.api.authentication_controller as auth

auth_api = Blueprint("auth_api", __name__)
auth_api.route("/auth/signup", methods=["POST"])(auth.signup)
auth_api.route("/auth/signin", methods=["POST"])(auth.signin)
auth_api.route("/auth/signout", methods=["POST"])(auth.signout)
auth_api.route("/auth/whoami", methods=["GET"])(auth.whoami)


# User
# user_api = Blueprint("user_api", __name__)
# user_api.route("/user/change_password", methods=["POST"])(change_password)
# user_api.route("/user/forgot_password", methods=["POST"])(forgot_password)


# [Channel] blueprint
import app.api.channel_controller as channel

channel_api = Blueprint("channel_api", __name__)
channel_api.route("/channel", methods=["POST"])(channel.create)
channel_api.route("/channel", methods=["GET"])(channel.index)

channel_api.route("/channel/<cid>/membership/<uid>", methods=["POST"])(
    channel.add_member
)
channel_api.route("/channel/<cid>/membership", methods=["GET"])(channel.get_members)

# channel_api.route("/channel/<id>", methods=["GET"])(channel.show)
# channel_api.route("/channel/<id>", methods=["PUT"])(channel.update)
# channel_api.route("/channel/<id>", methods=["DELETE"])(channel.destroy)


# [Membership] blueprint
# import app.api.membership_controller as membership

# channel_api = Blueprint("membership_api", __name__)
# channel_api.route("/membership/<channel_id>", methods=["POST"])(membership.create)
# channel_api.route("/membership/<channel_id>", methods=["GET"])(membership.index)
# channel_api.route("/membership/<id>", methods=["PUT"])(membership.update)
# channel_api.route("/membership/<id>", methods=["DELETE"])(membership.destroy)
