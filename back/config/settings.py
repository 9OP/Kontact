from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, "../.env"))


class Config:
    # App
    SECRET_KEY = environ.get("SECRET_KEY")
    PAYLOAD_EXPIRATION = 7200  # 2 hours

    # CORS origins
    CORS_ORIGINS = environ.get("CORS_ORIGINS", "*")

    # Referer
    REFERER = environ.get("REFERER", "")


class ProdConfig(Config):
    # Database
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://"
        f"{environ.get('PROD_DB_USER')}:{environ.get('PROD_DB_PASS')}@"
        f"{environ.get('PROD_DB_ADDR')}:{environ.get('PROD_DB_PORT')}/"
        f"{environ.get('PROD_DB_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevConfig(Config):
    # Database
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://"
        f"{environ.get('DB_USER')}:{environ.get('DB_PASS')}@"
        f"{environ.get('DB_ADDR')}:{environ.get('DB_PORT')}/"
        f"{environ.get('DB_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestConfig(Config):
    CORS_ORIGINS = "*"
    REFERER = ""
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://tester:secret@"
        f"{environ.get('TEST_HOST', 'db')}:5432/kontact_test"
    )


conf = {
    "development": DevConfig,
    "production": ProdConfig,
    "testing": TestConfig,
}
