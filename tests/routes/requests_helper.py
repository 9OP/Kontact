import json
from tests.conftest import UserToken


mimetype = "application/json"


class RequestsHelper:
    headers = {"Content-Type": mimetype, "Accept": mimetype}

    def expect_success(self, expected={}, code=200):
        data = json.loads(self.response.data)
        assert self.response.status_code == code
        assert expected.items() <= data.items()

    def expect_failure(self, expected={}, code=400):
        data = json.loads(self.response.data)
        assert self.response.status_code == code
        assert expected.items() <= data.items()

    def login(self, user):
        tk = UserToken.create(user_id=user.id)
        self.headers["kt_token"] = tk.token
        return tk
