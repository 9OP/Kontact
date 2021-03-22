from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, "../.env"))


class Config:
    # App
    SECRET_KEY = environ.get("SECRET_KEY")
    PAYLOAD_EXPIRATION = 7200  # 2 hours

    # Database
    DB_ADDR = environ.get("DB_ADDR")
    DB_PORT = environ.get("DB_PORT")
    DB_NAME = environ.get("DB_NAME")
    DB_USER = environ.get("DB_USER")
    DB_PASS = environ.get("DB_PASS")
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{DB_USER}:{DB_PASS}@{DB_ADDR}:{DB_PORT}/{DB_NAME}"
    )


class ProdConfig(Config):
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevConfig(Config):
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestConfig(Config):
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = "postgresql://tester:secret@localhost:5432/kontact_test"


conf = {
    "development": DevConfig,
    "production": ProdConfig,
    "testing": TestConfig,
}
