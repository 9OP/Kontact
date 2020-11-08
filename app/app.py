from os import environ
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_talisman import Talisman, DEFAULT_CSP_POLICY
from app.config import Cfg


def create_app(env=None):
    env = env or environ.get("FLASK_ENV")
    app = Flask(__name__)
    app.config.from_object(Cfg[env])

    from app.models.database import db, bcrypt

    db.init_app(app)
    bcrypt.init_app(app)
    Migrate(app, db)
    CORS(app)
    Talisman(
        app,
        force_https=environ.get("FORCE_HTTPS") == "true",
        content_security_policy=environ.get("CSP_DIRECTIVES", DEFAULT_CSP_POLICY),
    )

    with app.app_context():
        from app.api import api, auth_api, channel_api

        app.register_blueprint(api)
        app.register_blueprint(auth_api)
        app.register_blueprint(channel_api)

    return app
