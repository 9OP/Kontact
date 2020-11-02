class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = "this-really-needs-to-be-changed"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PAYLOAD_EXPIRATION = 3600  # int(environ.get("PAYLOAD_EXPIRATION", 3600))


class Development(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///../kontact_dev.sqlite3"
    DEVELOPMENT = True
    DEBUG = True
