import pytest
import app.api_responses as apr
from app.models import Access, User
from tests.routes.requests_helper import (
    expect_failure,
    expect_success,
    payload,
    mock_token,
    loggin_user,
)


class TestAuthSignup:
    def test_signup(self, client):
        """
        GIVEN a user input
        WHEN POST /auth/signup
        THEN returns user + 201
        """
        user_data = {
            "name": "   martin   ",
            "email": "MARTIN@mail.com",
            "password": "Abc123*",
        }
        response = client.post("/auth/signup", **payload(user_data))
        user = User.find(email=user_data["email"].lower())
        expect_success(response, user.summary(), code=201)

    def test_fail_already_registered(self, client, _user):
        """
        GIVEN a user already registered
        WHEN POST /auth/signup
        THEN return 410
        """
        user, user_data = _user
        response = client.post("/auth/signup", **payload(user_data))
        expect_failure(response, {"app_code": 410}, code=400)

    @pytest.mark.parametrize(
        "case, user_data",
        {
            "no_params": {},
            "missing_email_password": {"name": "Bob"},
            "missing_password": {"name": "Bob", "email": "bob@mail.com"},
            "missing_email": {"name": "Bob", "password": "Abc123*"},
            "missing_name": {"email": "bob@mail.com", "password": "Abc123*"},
            "missing_name_password": {"email": "bob@mail.com"},
            "missing_name_email": {"password": "Abc123*"},
            "weak_password": {
                "name": "Bob",
                "email": "bob@mail.com",
                "password": "123",
            },
            "invalid_email": {
                "name": "Bob",
                "email": "notmail",
                "password": "Abc123*",
            },
        }.items(),
    )
    def test_fail_invalid_parameter(self, client, case, user_data):
        """
        GIVEN wrong inputs
        WHEN POST /auth/signup
        THEN return 411, 400
        """
        response = client.post("/auth/signup", **payload(user_data))
        expect_failure(response, {"app_code": 411}, code=400)


class TestAuthSignin:
    def test_signin(self, client, _user, mock_token):  # noqa: F811
        """
        GIVEN a user credentials
        WHEN POST /auth/signin
        THEN returns user + token + set session user_id
        """
        user, user_data = _user
        response = client.post("/auth/signin", **payload(user_data))
        expect_success(response, {**user.summary(), "token": "mocked_token"}, code=200)
        with client.session_transaction() as session:
            assert session["user_id"] == user.id

    @pytest.mark.parametrize(
        "case, user_data",
        {
            "wrong_password": {"email": "bob@mail.com", "password": "*****"},
            "wrong_email": {"email": "alice@mail.com", "password": "Abc123*"},
        }.items(),
    )
    def test_fail_credentials(self, client, make_user, case, user_data):
        """
        GIVEN a user failed credentials
        WHEN POST /auth/signin
        THEN returns 419, 401
        """
        make_user(name="Bob", email="bob@mail.com", password="Abc123*")
        response = client.post("/auth/signin", **payload(user_data))
        expect_failure(response, {"app_code": 419}, code=401)

    @pytest.mark.parametrize(
        "case, user_data",
        {
            "no_params": {},
            "missing_email": {"password": "Abc123*"},
            "missing_password": {"email": "bob@mail.com"},
        }.items(),
    )
    def test_missing_credentials(self, client, make_user, case, user_data):
        """
        GIVEN incomplete credentials
        WHEN POST /auth/signin
        THEN returns 411, 400
        """
        make_user(name="Bob", email="bob@mail.com", password="Abc123*")
        response = client.post("/auth/signin", **payload(user_data))
        expect_failure(response, {"app_code": 411}, code=400)


class TestAuthWhoami:  # test if delegation works
    def test_whoami(self, client, loggin_user):  # noqa: F811
        """
        GIVEN a signed in user
        WHEN GET /auth/whoami
        THEN returns user data
        """
        user, token, _ = loggin_user

        response = client.get("/auth/whoami", **payload(token=token))
        expect_success(response, user.summary(), code=200)


class TestAuthSignout:
    def test_signout(self, client, loggin_user):  # noqa: F811
        """
        GIVEN a signed in user
        WHEN GET /auth/signout
        THEN signout user
        """
        user, token, _ = loggin_user

        response = client.post("/auth/signout", **payload(token=token))
        expect_success(
            response,
            {"app_code": 200, "description": "Signout successfully."},
            code=200,
        )

        response = client.get("/auth/whoami", **payload(token=token))
        expect_failure(response, {"app_code": 421}, code=401)


class TestAuthKey:
    def test_key(self, client, loggin_user):  # noqa: F811
        """
        GIVEN a signed in user
        WHEN GET /auth/key
        THEN return session les_key
        """
        user, token, session = loggin_user

        response = client.get("/auth/key", **payload(token=token))
        expect_success(response, {"key": session.get("les_key")}, code=200)
