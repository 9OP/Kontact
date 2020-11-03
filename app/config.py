from os import environ, path

# from dotenv import load_dotenv
# load_dotenv(path.join(basedir, environ["APP_CONFIG_FILE"]))
basedir = path.abspath(path.dirname(__file__))


class Default(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = "this-really-needs-to-be-changed"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PAYLOAD_EXPIRATION = 3600  # int(environ.get("PAYLOAD_EXPIRATION", 3600))


class Development(Default):
    SQLALCHEMY_DATABASE_URI = "sqlite:///../kontact_dev.sqlite3"
    DEVELOPMENT = True
    DEBUG = True


class Production(Default):
    DEBUG = False
    DEVELOPMENT = False


class Staging(Default):
    DEBUG = True
    DEVELOPMENT = False


class Testing(Default):
    DEVELOPMENT = False
    TESTING = True
    DEBUG = False


# Return config based on env variable /
# If env supplied, return the corresponding environment
def config_factory(conf=None):
    CONFIG = {
        "default": Default,
        "development": Development,
        "production": Production,
        "staging": Staging,
        "testing": Testing,
    }
    env = conf or environ.get("FLASK_ENV", "default")
    return CONFIG[env]


Config = config_factory()
