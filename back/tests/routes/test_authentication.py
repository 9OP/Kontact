import pytest
from app.models.user_model import Access
from tests.routes.requests_helper import RequestsHelper
from tests.conftest import UserToken
from tests.factories import user_factory


def stub_encode(*args, **kwargs):
    return "mocked_token"


@pytest.mark.usefixtures("cleandb")
class AuthenticationRequestsSuite(RequestsHelper):
    @pytest.fixture()
    def user(self, make_user):
        data = user_factory()
        user = make_user(**data)
        self.user_data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "access": Access(user.access).name,
        }
        self.args = {
            "email": data["email"],
            "password": data["password"],
            "name": data["name"],
        }

    # Generic controller test
    def test_fail_route(self):
        """
        GIVEN
        WHEN call undefined route
        THEN returns 405
        """
        response = self.get("/auth/signup")
        RequestsHelper.expect_failure(response, {"app_code": 1000}, code=405)

    # Generic controller test
    def test_fail_mimetypes(self, user):
        """
        GIVEN wrong mimetypes
        WHEN POST request
        THEN returns 400
        """
        self.base_headers = {}  # This removes Content-Type: application/json
        response = self.post("/auth/signin", self.args)
        RequestsHelper.expect_failure(response, {"app_code": 400})

    def test_signup(self):
        """
        GIVEN a user input
        WHEN POST /auth/signup
        THEN returns user + 201
        """
        self.mock(UserToken, "encode", stub_encode)
        user = user_factory()
        response = self.post("/auth/signup", user)
        RequestsHelper.expect_success(
            response,
            {
                "name": user["name"],
                "email": user["email"],
                "token": "mocked_token",
            },
            code=201,
        )

    def test_signup_fail_already_registered(self, user):
        """
        GIVEN a user already registered
        WHEN POST /auth/signup
        THEN returns 400
        """
        response = self.post("/auth/signup", self.args)
        RequestsHelper.expect_failure(response, {"app_code": 410})

    def test_signup_fail_email_validation(self, user):
        """
        GIVEN wrong email
        WHEN POST /auth/signup
        THEN returns 400
        """
        args = {**self.args, "email": "notamail"}
        response = self.post("/auth/signup", args)
        RequestsHelper.expect_failure(response, {"app_code": 411})

    def test_signup_fail_password_validation(self, user):
        """
        GIVEN weak password
        WHEN POST /auth/signup
        THEN returns 400
        """
        args = {**self.args, "password": "weak"}
        response = self.post("/auth/signup", args)
        RequestsHelper.expect_failure(response, {"app_code": 411})

    def test_signin(self, user):
        """
        GIVEN a registered user
        WHEN OST /auth/signin
        THEN returns authentication token
        """
        self.mock(UserToken, "encode", stub_encode)
        response = self.post("/auth/signin", self.args)
        RequestsHelper.expect_success(
            response, {**self.user_data, "token": "mocked_token"}
        )

    def test_signin_fail_credentials(self, user):
        """
        GIVEN a registered user
        WHEN POST /auth/signin with wrong password
        THEN returns 401
        """
        response = self.post("/auth/signin", {**self.args, "password": "blublu"})
        RequestsHelper.expect_failure(response, {"app_code": 419}, code=401)

    def test_signout(self, user):
        """
        GIVEN a user registered
        WHEN POST /auth/signout
        THEN invalidate token + 200
        """
        token = self.login(self.user_data["id"])
        response = self.post("/auth/signout")
        RequestsHelper.expect_success(response, {"app_code": 200})
        assert token.revoked_at is not None

    # def test_signout_without_token(self):
    #     """
    #     GIVEN no user / no token
    #     WHEN POST /auth/signout
    #     THEN 200
    #     """
    #     response = self.post("/auth/signout")
    #     RequestsHelper.expect_success(response, {"app_code": 200})

    def test_whoami(self, user):
        """
        GIVEN a user registered
        WHEN POST /auth/whoami
        THEN return user info
        """
        self.login(self.user_data["id"])
        response = self.get("/auth/whoami")
        RequestsHelper.expect_success(response, self.user_data)

    def test_authentication_missing_token(self):
        """
        GIVEN
        WHEN POST /auth/whoami without token
        THEN returns 401
        """
        response = self.get("/auth/whoami")
        RequestsHelper.expect_failure(response, {"app_code": 401}, code=401)

    def test_authentication_empty_token(self):
        """
        GIVEN
        WHEN POST /auth/whoami with none token
        THEN return 401
        """
        self.headers = {"Authorization": None}
        response = self.get("/auth/whoami")
        RequestsHelper.expect_failure(response, {"app_code": 420}, code=401)
