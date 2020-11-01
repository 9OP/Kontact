from flask import Blueprint
from app.api.home_controller import *

api = Blueprint("api", __name__)


api.route("/")(hello)