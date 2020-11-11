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
        def post(route, data={}):
            payload = {
                "data": json.dumps(data),
                "headers": {**self.base_headers, **self.headers},
            }
            return client.post(route, **payload)

        def put(route, data={}):
            payload = {
                "data": json.dumps(data),
                "headers": {**self.base_headers, **self.headers},
            }
            return client.put(route, **payload)

        def get(route):
            payload = {"headers": {**self.base_headers, **self.headers}}
            return client.get(route, **payload)

        def delete(route):
            payload = {"headers": {**self.base_headers, **self.headers}}
            return client.delete(route, **payload)

        self.post = post
        self.put = put
        self.get = get
        self.delete = delete
        self.mock = monkeypatch.setattr

    def setup_method(self):
        self.headers = {}

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

    def login(self, user_id):
        tk = UserToken.create(user_id=user_id)
        self.headers["kt_token"] = tk.token
        return tk
