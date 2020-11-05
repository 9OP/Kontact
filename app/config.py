from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, "../.env"))


class Config:
    SECRET_KEY = environ.get("SECRET_KEY")
    PAYLOAD_EXPIRATION = 7200  # 2 hours


class ProdConfig(Config):
    # ENV = "production"
    # DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = environ.get("PROD_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevConfig(Config):
    # ENV = "development"
    # DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = environ.get("DEV_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestConfig(Config):
    # ENV = "development"
    # DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = environ.get("TEST_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = True


Cfg = {
    "development": DevConfig,
    "production": ProdConfig,
    "testing": TestConfig,
}
