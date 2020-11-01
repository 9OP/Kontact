from flask import Blueprint
from app.common.errors import *
from app.api.authentication_controller import signup, signin, signout, whoami

# Create the API blueprint
api = Blueprint("api", __name__)

# Create different blueprint: auth_api, user_api, token_api etc...

# Add specific error handler
api.app_errorhandler(UserAlreadyExists)(generic_handler)
# api.errorhandler(NotFoundError)


# Authentication
api.route("/auth/signup", methods=["POST"])(signup)
api.route("/auth/signin", methods=["POST"])(signin)
api.route("/auth/signout", methods=["POST"])(signout)
api.route("/auth/whoami", methods=["GET"])(whoami)

# User