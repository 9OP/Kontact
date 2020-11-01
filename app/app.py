from flask import Flask
from flask_migrate import Migrate
from app.api import *
from app.models import *


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Development")  # os.environ["APP_SETTINGS"]

    app.register_blueprint(api)  # , url_prefix='/accounts')

    db.init_app(app)
    bcrypt.init_app(app)
    Migrate(app, db)

    return app
