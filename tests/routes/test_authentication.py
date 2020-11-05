import pytest
import json
from tests.routes.requests_helper import RequestsHelper
from tests.conftest import UserToken


user_data = {
    "email": "user@mail.com",
    "name": "user",
    "password": "123abcABC#$%",
}


@pytest.mark.usefixtures("database")
class AuthenticationRequestsSuite(RequestsHelper):
    @pytest.fixture(autouse=True)
    def _base(self, client, make_token, make_user, monkeypatch):
        def post(route, data={}):
            payload = {
                "data": json.dumps(data),
                "headers": {**self.headers},
            }
            return client.post(route, **payload)

        def get(route):
            payload = {"headers": {**self.headers}}
            return client.get(route, **payload)

        self.post = post
        self.get = get

        self.make_user = make_user
        self.make_token = make_token

        self.mock = monkeypatch.setattr

    def test_signup(self):
        """
        GIVEN a user input
        WHEN a POST /auth/signup
        THEN register user
        """
        self.mock(UserToken, "token", "mocked_token")
        self.response = self.post("/auth/signup", user_data)
        self.expect_success(
            {"name": "user", "email": "user@mail.com", "token": "mocked_token"},
        )

    def test_fail_signup(self):
        """
        GIVEN a user input registered
        WHEN a POST /auth/signup
        THEN fail registered
        """
        self.make_user(**user_data)
        self.response = self.post("/auth/signup", user_data)
        self.expect_failure()

    def test_signin(self):
        """
        GIVEN a user registered
        WHEN a POST /auth/signin
        THEN return authentication token
        """
        self.mock(UserToken, "token", "mocked_token")
        self.make_user(**user_data)
        self.response = self.post("/auth/signin", user_data)
        self.expect_success(
            {"name": "user", "email": "user@mail.com", "token": "mocked_token"},
        )

    def test_signout(self):
        """
        GIVEN a user registered
        WHEN a POST /auth/signout
        THEN return success and invalidate token
        """
        user = self.make_user(**user_data)
        token = self.login(user)
        self.response = self.post("/auth/signout")
        self.expect_success({"code": 200, "description": "Signout successfully."})
        assert token.revoked_at is not None

    def test_whoami(self):
        """
        GIVEN a user registered
        WHEN a POST /auth/whoami
        THEN return user info
        """
        user = self.make_user(**user_data)
        self.login(user)
        self.response = self.get("/auth/whoami")
        self.expect_success({"name": "user", "email": "user@mail.com"})
