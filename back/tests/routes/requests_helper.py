import pytest
import uuid
import datetime
from flask import json
from tests.conftest import UserToken

base_headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}


def payload(data={}, headers={}, token=""):
    return {
        "headers": {
            **base_headers,
            **headers,
            "Authorization": f"Bearer {token}",
        },
        "data": json.dumps(data),
    }


@pytest.fixture
def mock_token(monkeypatch):
    def mock(*args, **kwargs):
        return "mocked_token"

    monkeypatch.setattr(UserToken, "encode", mock)


@pytest.fixture
def loggin_user(client, _user):
    user, user_data = _user
    response = client.post("/auth/signin", **payload(user_data))
    token = json.loads(response.data).get("token")
    with client.session_transaction() as sess:  # next requests under same session
        yield user, token, sess


def expect_success(response, expected={}, code=200):
    def fmt(x):
        return json.loads(json.dumps(x))

    data = json.loads(response.data)
    assert response.status_code == code

    if isinstance(expected, dict):
        expected = fmt(expected)
        # assert expected.items() <= data.items()
        assert expected.items() == data.items()

    if isinstance(expected, list):
        expected = [fmt(exp) for exp in expected]
        assert len(data) == len(expected)
        assert len([d for d in data if d not in expected]) == 0
        assert len([d for d in expected if d not in data]) == 0


def expect_failure(response, expected={}, code=400):
    data = json.loads(response.data)
    assert response.status_code == code
    assert expected.items() <= data.items()
