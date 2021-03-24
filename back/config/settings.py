from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, "../.env"))


class Config:
    # App
    SECRET_KEY = environ.get("SECRET_KEY", "secret")
    PAYLOAD_EXPIRATION = 7200  # 2 hours

    # CORS origins
    CORS_ORIGINS = environ.get("CORS_ORIGINS", "*")

    # Referer
    REFERER = environ.get("REFERER", "")


class ProdConfig(Config):
    # Database
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://"
        f"{environ.get('PROD_DB_USER')}@"
        f"{environ.get('PROD_DB_ADDR')}/"
        f"{environ.get('PROD_DB_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevConfig(Config):
    # Database
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://"
        f"{environ.get('DB_USER', 'developer:secret')}@"
        f"{environ.get('DB_ADDR', 'database:5432')}/"
        f"{environ.get('DB_NAME', 'kontact_dev')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestConfig(Config):
    CORS_ORIGINS = "*"
    REFERER = ""
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = "postgresql://tester:secret@database:5432/kontact_test"


conf = {
    "development": DevConfig,
    "production": ProdConfig,
    "testing": TestConfig,
}
