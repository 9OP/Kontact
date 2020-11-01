from flask import Flask
from werkzeug.exceptions import HTTPException


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Development")  # os.environ["APP_SETTINGS"]

    with app.app_context():
        from flask_migrate import Migrate
        from app.api import api, generic_handler
        from app.models import db, bcrypt
        from app.models import User, UserToken

        app.register_blueprint(api)
        app.errorhandler(HTTPException)(generic_handler)

        db.init_app(app)
        bcrypt.init_app(app)
        Migrate(app, db)

    return app
