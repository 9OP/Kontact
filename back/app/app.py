from os import environ
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_talisman import Talisman
from config.settings import conf
from app.extensions import JSON_Improved


def create_app(settings_override=None):
    env = settings_override or environ.get("FLASK_ENV")
    app = Flask(__name__)
    app.config.from_object(conf[env])

    from app.models.database import db

    app.json_encoder = JSON_Improved
    db.init_app(app)
    Migrate(app, db)
    CORS(app, supports_credentials=True)
    Talisman(app, force_https=False)

    with app.app_context():
        from app.api import api, auth_api, user_api, channel_api

        app.register_blueprint(api)
        app.register_blueprint(auth_api)
        app.register_blueprint(user_api)
        app.register_blueprint(channel_api)

    return app
