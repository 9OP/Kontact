from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, "../.env"))


class Config:
    SECRET_KEY = environ.get("SECRET_KEY", "secret")
    TOKEN_EXPIRATION = 3600
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = environ.get("SECURE_COOKIE", False)
    FORCE_HTTPS = environ.get("FORCE_HTTPS", False)
    CORS_ORIGINS = environ.get("CORS_ORIGINS", "*")
    REFERER = environ.get("REFERER", "")


class ProdConfig(Config):
    SESSION_COOKIE_SECURE = True
    FORCE_HTTPS = True
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://"
        f"{environ.get('PROD_DB_USER')}@"
        f"{environ.get('PROD_DB_ADDR')}/"
        f"{environ.get('PROD_DB_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://"
        f"{environ.get('DB_USER', 'developer:secret')}@"
        f"{environ.get('DB_ADDR', 'postgres:5432')}/"
        f"{environ.get('DB_NAME', 'kontact_dev')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestConfig(Config):
    CORS_ORIGINS = "*"
    REFERER = ""
    SESSION_COOKIE_SECURE = False
    FORCE_HTTPS = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = "postgresql://tester:secret@postgres:5432/kontact_test"


conf = {
    "development": DevConfig,
    "production": ProdConfig,
    "testing": TestConfig,
}
