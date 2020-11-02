from flask import Flask
from flask_cors import CORS
from flask_talisman import Talisman
from werkzeug.exceptions import HTTPException


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Development")  # os.environ["APP_SETTINGS"]
    CORS(app)
    Talisman(app)

    with app.app_context():
        from flask_migrate import Migrate
        from app.api import api, auth_api, generic_handler
        from app.models import db, bcrypt

        app.register_blueprint(api)
        app.register_blueprint(auth_api)
        app.errorhandler(HTTPException)(generic_handler)

        # Import all models
        from app.models.user import User
        from app.models.user_token import UserToken

        db.init_app(app)
        bcrypt.init_app(app)
        Migrate(app, db)

    return app
