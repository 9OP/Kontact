import pytest
import json
from tests.routes.requests_helper import RequestsHelper
from tests.conftest import UserToken
from tests.factories import user_factory


@pytest.mark.usefixtures("database")
class AuthenticationRequestsSuite(RequestsHelper):
    @pytest.fixture(autouse=True)
    def _base(self, make_token, make_user):
        data = user_factory()
        user = make_user(**data)
        self.user_data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        }
        self.args = {
            "email": data["email"],
            "password": data["password"],
            "name": data["name"],
        }
        self.make_user = make_user
        self.make_token = make_token

    def test_fail_route(self):
        """
        GIVEN
        WHEN call undefined route
        THEN fail
        """
        response = self.get("/auth/signup")
        RequestsHelper.expect_failure(response, {"code": 500}, code=405)

    def test_signup(self):
        """
        GIVEN a user input
        WHEN a POST /auth/signup
        THEN register user
        """
        user = user_factory()
        self.mock(UserToken, "token", "mocked_token")
        response = self.post("/auth/signup", user)
        RequestsHelper.expect_success(
            response,
            {
                "name": user["name"],
                "email": user["email"],
                "token": "mocked_token",
            },
        )

    def test_fail_signup(self):
        """
        GIVEN a user input registered
        WHEN a POST /auth/signup
        THEN fail registered
        """
        response = self.post("/auth/signup", self.args)
        RequestsHelper.expect_failure(response, {"code": 409})

    def test_fail_validation_signup(self):
        """
        GIVEN wrong email
        WHEN a POST /auth/signup
        THEN fail registered
        """
        args = {**self.args, "email": "notamail"}
        response = self.post("/auth/signup", args)
        RequestsHelper.expect_failure(response, {"code": 411})

    def test_fail_mimetypes(self):
        """
        GIVEN wrong mimetypes
        WHEN a POST request
        THEN fail
        """
        self.base_headers = {}  # This removes Content-Type: application/json
        response = self.post("/auth/signin", self.args)
        RequestsHelper.expect_failure(response, {"code": 415})

    def test_signin(self):
        """
        GIVEN a user registered
        WHEN a POST /auth/signin
        THEN return authentication token
        """
        self.mock(UserToken, "token", "mocked_token")
        response = self.post("/auth/signin", self.args)
        RequestsHelper.expect_success(
            response, {**self.user_data, "token": "mocked_token"}
        )

    def test_fail_password_signin(self):
        """
        GIVEN a user registered
        WHEN a POST /auth/signin with wrong password
        THEN return an error
        """
        response = self.post("/auth/signin", {**self.args, "password": "blublu"})
        RequestsHelper.expect_failure(response, {"code": 411})

    def test_fail_email_signin(self):
        """
        GIVEN a user registered
        WHEN a POST /auth/signin with wrong email
        THEN return an error
        """
        args = {**self.args, "email": "wrong@mail.com"}
        response = self.post("/auth/signin", args)
        RequestsHelper.expect_failure(response, {"code": 411})

    def test_signout(self):
        """
        GIVEN a user registered
        WHEN a POST /auth/signout
        THEN return success and invalidate token
        """
        token = self.login(self.user_data)
        response = self.post("/auth/signout")
        RequestsHelper.expect_success(response, {"code": 200})
        assert token.revoked_at is not None

    def test_whoami(self):
        """
        GIVEN a user registered
        WHEN a POST /auth/whoami
        THEN return user info
        """
        self.login(self.user_data)
        response = self.get("/auth/whoami")
        RequestsHelper.expect_success(response, self.user_data)

    def test_missing_auth_token(self):
        """
        GIVEN nothing / or a user
        WHEN a POST /auth/whoami without auth token
        THEN return an error
        """
        self.headers = {}
        response = self.get("/auth/whoami")
        RequestsHelper.expect_failure(response, {"code": 401}, code=401)

    def test_empty_auth_token(self):
        """
        GIVEN nothing / or a user
        WHEN a POST /auth/whoami without auth token
        THEN return an error
        """
        self.headers = {"kt_token": None}
        response = self.get("/auth/whoami")
        RequestsHelper.expect_failure(response, {"code": 401}, code=401)
