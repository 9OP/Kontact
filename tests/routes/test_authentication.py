import pytest
import json
from app.models import UserToken

user_data = {
    "email": "user@mail.com",
    "name": "user",
    "password": "123abcABC#$%",
}

mimetype = "application/json"
headers = {"Content-Type": mimetype, "Accept": mimetype}


# creer une classe base, dont *Suite herite et utiliser self.response plutot
def expect_success(response, expected={}):
    # assert success
    data = json.loads(response.data)
    assert response.status_code == 200
    assert expected.items() <= data.items()


def expect_failure(response, expected={}):
    # assert failure
    assert response.status_code == 400
    pass


# Set auth token in self.token
def login(token):
    pass


@pytest.mark.usefixtures("database", "app")
class AuthenticationRequestsSuite:
    @pytest.fixture(autouse=True)
    def _base(self, client, database, make_token, make_user, monkeypatch):
        monkeypatch.setattr(UserToken, "token", "mocked_token")

        def post(route, data):
            payload = {
                "data": json.dumps(data),
                "headers": {**headers},
            }  # **self.headers
            return client.post(route, **payload)

        self.post = post
        self.get = client.get

        self.make_user = make_user
        self.make_token = make_token

    def test_signup(self):
        """
        GIVEN a user input
        WHEN a POST /auth/signup
        THEN register user
        """
        response = self.post("/auth/signup", user_data)
        expect_success(
            response,
            {"name": "user", "email": "user@mail.com", "token": "mocked_token"},
        )

    # def test_fail_signup(self):
    #     """
    #     GIVEN a user input registered
    #     WHEN a POST /auth/signup
    #     THEN fail registered
    #     """
    #     self.make_user(**user_data)
    #     response = self.post("/auth/signup", user_data)
    #     expect_failure(response)

    # def test_signin(self):
    #     pass

    # def test_signout(self):
    #     pass

    # def test_whoami(self):
    #     pass
