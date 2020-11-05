import pytest
from app import create_app
from app.common.database import db
from app.models import User, UserToken


@pytest.fixture(scope="module")
def test_client():
    kontact = create_app("development")
    test_client = kontact.test_client()

    ctx = kontact.app_context()
    ctx.push()

    yield test_client

    ctx.pop()


@pytest.fixture(scope="module")
def init_database(test_client):
    db.drop_all()
    db.create_all()

    yield db


@pytest.fixture
def make_user(init_database):
    created_records = []

    def _make_user(**kwargs):
        user = User(**kwargs)
        db.session.add(user)
        db.session.commit()
        created_records.append(user)
        return user

    yield _make_user

    for record in created_records:
        db.session.delete(record)
        db.session.commit()
