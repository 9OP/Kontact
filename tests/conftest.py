import pytest
from app import create_app
from app.common.database import db
from app.models import User, UserToken


@pytest.fixture(scope="module")
def app():
    return create_app("development")


@pytest.fixture(scope="module")
def client(app):
    return app.test_client()


@pytest.fixture(scope="function")
def database(app):
    db.app = app

    with app.app_context():
        db.create_all()

    yield db

    db.session.close()
    db.drop_all()


@pytest.fixture(scope="function")
def make_user(database):
    # setup
    def _make_user(**kwargs):
        user = User(**kwargs)
        db.session.add(user)
        db.session.commit()
        return user

    yield _make_user
    # teardown


@pytest.fixture(scope="function")
def make_token(database):
    # setup
    def _make_token(**kwargs):
        token = UserToken(**kwargs)
        db.session.add(token)
        db.session.commit()
        return token

    yield _make_token
    # teardown