import pytest
import json

user_data = {
    "email": "user@mail.com",
    "name": "user",
    "password": "123abcABC#$%",
}

mimetype = "application/json"
headers = {"Content-Type": mimetype, "Accept": mimetype}


class AuthenticationRequestsSuite:
    @pytest.fixture(autouse=True)
    def _base(self, client, database):
        def post(route, data, headers=headers):
            return client.post(route, data=json.dumps(data), headers=headers)

        self.post = post
        self.get = client.get

    def test_signup(self):
        """
        GIVEN a user input
        WHEN a POST /auth/signup
        THEN register user
        """
        response = self.post("/auth/signup", user_data)
        assert response.status_code == 200
