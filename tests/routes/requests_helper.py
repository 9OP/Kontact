import pytest
import uuid
import datetime
from flask import json
from tests.conftest import UserToken


class RequestsHelper:
    headers = {}
    base_headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    @pytest.fixture(autouse=True)
    def setup_method(self, client, monkeypatch):
        def post(route, data={}):
            payload = {
                "data": json.dumps(data),
                "headers": {**self.base_headers, **self.headers},
            }
            return client.post(route, **payload)

        def get(route):
            payload = {"headers": {**self.base_headers, **self.headers}}
            return client.get(route, **payload)

        def put(route, data={}):
            payload = {
                "data": json.dumps(data),
                "headers": {**self.base_headers, **self.headers},
            }
            return client.put(route, **payload)

        def delete(route):
            payload = {"headers": {**self.base_headers, **self.headers}}
            return client.delete(route, **payload)

        self.post = post
        self.get = get
        self.put = put
        self.delete = delete

        self.mock = monkeypatch.setattr
        self.headers = {}

    @staticmethod
    def expect_success(response, expected={}, code=200):
        def fmt(x):
            return json.loads(json.dumps(x))

        data = json.loads(response.data)
        assert response.status_code == code

        if isinstance(expected, dict):
            expected = fmt(expected)
            assert expected.items() <= data.items()

        if isinstance(expected, list):
            expected = [fmt(exp) for exp in expected]
            assert len(data) == len(expected)
            assert all([a == b for a, b in zip(data, expected)])

    @staticmethod
    def expect_failure(response, expected={}, code=400):
        data = json.loads(response.data)
        assert response.status_code == code
        assert expected.items() <= data.items()

    def login(self, user_id):
        tk = UserToken.create(user_id=user_id)
        self.headers["kt_token"] = tk.token
        return tk
