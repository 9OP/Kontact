import pytest
import json
from tests.conftest import UserToken


class RequestsHelper:
    headers = {}
    base_headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    @pytest.fixture(autouse=True)
    def _requests_base(self, client, monkeypatch):
        # Setup
        def post(route, data={}):
            payload = {
                "data": json.dumps(data),
                "headers": {**self.base_headers, **self.headers},
            }
            return client.post(route, **payload)

        def get(route):
            payload = {"headers": {**self.base_headers, **self.headers}}
            return client.get(route, **payload)

        self.post = post
        self.get = get
        self.mock = monkeypatch.setattr

    @staticmethod
    def expect_success(response, expected={}, code=200):
        data = json.loads(response.data)
        assert response.status_code == code
        assert expected.items() <= data.items()

    @staticmethod
    def expect_failure(response, expected={}, code=400):
        data = json.loads(response.data)
        assert response.status_code == code
        assert expected.items() <= data.items()

    def login(self, user):
        tk = UserToken.create(user_id=user["id"])
        self.headers["kt_token"] = tk.token
        return tk
