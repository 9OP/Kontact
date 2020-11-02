from flask import Blueprint
from app.common.errors import *
from app.api.authentication_controller import signup, signin, signout, whoami

# Create the API blueprint
api = Blueprint("api", __name__)
api.app_errorhandler(ResourceAlreadyExists)(generic_handler)
api.app_errorhandler(InvalidParameter)(generic_handler)
api.app_errorhandler(MissingParameter)(generic_handler)
api.app_errorhandler(Unauthorized)(generic_handler)
api.app_errorhandler(TokenExpired)(generic_handler)


# Authentication
auth_api = Blueprint("auth_api", __name__)
auth_api.route("/auth/signup", methods=["POST"])(signup)
auth_api.route("/auth/signin", methods=["POST"])(signin)
auth_api.route("/auth/signout", methods=["POST"])(signout)
auth_api.route("/auth/whoami", methods=["GET"])(whoami)

# User