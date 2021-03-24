import pytest
from flask_cors import CORS
from tests.routes.requests_helper import (  # noqa: F401
    expect_failure,
    expect_success,
    payload,
    mock_token,
    loggin_user,
)


def test_cors_origins(app, client, _user):
    """
    GIVEN cors setting
    WHEN api request
    THEN set cors origins
    """
    _, user_data = _user
    CORS(app, supports_credentials=True, origins="www.domain.com")
    response = client.post("/auth/signin", **payload(user_data))
    assert response.headers.get("Access-Control-Allow-Origin") == "www.domain.com"
    assert response.headers.get("Access-Control-Allow-Credentials") == "true"


def test_referer(app, client, _user, monkeypatch):
    """
    GIVEN referer setting
    WHEN api request
    THEN filter wrt referer
    """
    user, user_data = _user
    monkeypatch.setattr(app, "config", {**app.config, "REFERER": "api_referer"})

    response = client.post("/auth/signin", **payload(user_data))
    assert response.status_code == 401

    headers = {"Referer": "api_referer"}
    response = client.post("/auth/signin", **payload(user_data, headers=headers))
    assert response.status_code == 200


def test_mimetype(client):
    """
    GIVEN api request
    WHEN mimetyp != json
    THEN 400
    """
    headers = {"Content-Type": None, "Accept": None}
    response = client.post("/auth/signin", **payload(headers=headers))
    expect_failure(response, {"app_code": 400}, code=400)


@pytest.mark.parametrize("route, code", [("/void", 404), ("/auth/signup", 405)])
def test_response_handler(client, route, code):
    """
    GIVEN request
    WHEN route is not found
    THEN 4**
    """
    response = client.get(route, **payload())
    expect_failure(response, {"app_code": 1000}, code=code)
