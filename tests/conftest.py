import pytest
from app import create_app
from app.models.database import db
from app.models import (
    User,
    UserToken,
    Membership,
    Channel,
)


@pytest.fixture(scope="module")
def app():
    app = create_app("testing")
    with app.app_context():
        yield app


@pytest.fixture(scope="module")
def client(app):
    return app.test_client()


@pytest.fixture(scope="module")
def initdb(app):
    db.init_app(app)
    db.drop_all()
    db.create_all()
    db.session.commit()


@pytest.fixture(scope="function")
def cleandb(initdb):
    db.drop_all()
    db.create_all()
    yield db
    db.session.close()


@pytest.fixture(scope="module")
def make_user(initdb):
    # setup
    def _make_user(**kwargs):
        user = User(**kwargs)
        db.session.add(user)
        db.session.commit()
        return user

    yield _make_user
    # teardown


@pytest.fixture(scope="module")
def make_token(initdb):
    # setup
    def _make_token(**kwargs):
        token = UserToken(**kwargs)
        db.session.add(token)
        db.session.commit()
        return token

    yield _make_token
    # teardown


@pytest.fixture(scope="module")
def make_channel(initdb):
    # setup
    def _make_channel(**kwargs):
        channel = Channel(**kwargs)
        db.session.add(channel)
        db.session.commit()
        return channel

    yield _make_channel
    # teardown


@pytest.fixture(scope="module")
def make_membership(initdb):
    # setup
    def _make_membership(**kwargs):
        membership = Membership(**kwargs)
        db.session.add(membership)
        db.session.commit()
        return membership

    yield _make_membership
    # teardown
