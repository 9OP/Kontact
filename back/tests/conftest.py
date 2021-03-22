import pytest
import tests.factories as factory
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


@pytest.fixture(scope="function", autouse=True)
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


@pytest.fixture
def _user(make_user):
    user_data = factory.user()
    return make_user(**user_data), user_data


@pytest.fixture
def _token(make_user, make_token):
    user = make_user(**factory.user())
    return make_token(user_id=user.id), user


@pytest.fixture
def _channel(make_channel):
    channel_data = factory.channel()
    return make_channel(**channel_data), channel_data


@pytest.fixture
def _membership(make_membership, make_channel, make_user):
    user = make_user(**factory.user())
    channel = make_channel(**factory.channel())
    return make_membership(user_id=user.id, channel_id=channel.id), user, channel
