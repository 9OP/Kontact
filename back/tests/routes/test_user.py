import pytest
import app.api_responses as apr
from app.models import Access
from tests.routes.requests_helper import (
    expect_failure,
    expect_success,
    payload,
    mock_token,
    loggin_user,
)


class TestUserIndex:
    def test_index(self, client, loggin_user, make_user):  # noqa: F811
        """
        GIVEN an admin
        WHEN GET /user
        THEN returns users
        """
        user, token, _ = loggin_user

        user.update(access=Access.ADMIN)
        bob = make_user(name="bob", email="bob@mail.com", password="*")
        alice = make_user(name="alice", email="alice@mail.com", password="*")
        eve = make_user(name="eve", email="eve@mail.com", password="*")

        response = client.get("/user", **payload(token=token))
        expect_success(
            response,
            [user.summary(), bob.summary(), alice.summary(), eve.summary()],
            code=200,
        )

    def test_fail_access(self, client, loggin_user, make_user):  # noqa: F811
        """
        GIVEN a user
        WHEN GET /user
        THEN returns 403
        """
        user, token, _ = loggin_user
        response = client.get("/user", **payload(token=token))
        expect_failure(response, {"app_code": 403}, code=403)


class TestUserShow:
    def test_show(self, client, loggin_user, make_user):  # noqa: F811
        """
        GIVEN an admin
        WHEN GET /user/<user_id>
        THEN returns users
        """
        user, token, _ = loggin_user
        user.update(access=Access.ADMIN)

        response = client.get(f"/user/{user.id}", **payload(token=token))
        expect_success(response, user.summary(), code=200)

    def test_fail_access(self, client, loggin_user, make_user):  # noqa: F811
        """
        GIVEN a user
        WHEN GET /user/<user_id>
        THEN returns 403
        """
        user, token, _ = loggin_user
        response = client.get(f"/user/{user.id}", **payload(token=token))
        expect_failure(response, {"app_code": 403}, code=403)

    def test_fail_no_user(self, client, loggin_user, make_user):  # noqa: F811
        """
        GIVEN a user
        WHEN GET /user/**
        THEN returns 412, 400
        """
        user, token, _ = loggin_user
        user.update(access=Access.ADMIN)
        response = client.get("/user/123", **payload(token=token))
        expect_failure(response, {"app_code": 412}, code=400)


class TestUserSearch:
    def test_search(self, client, loggin_user, make_user):  # noqa: F811
        """
        GIVEN a user
        WHEN GET /user/search?name=...&email=...
        THEN returns relevant users
        """
        user, token, _ = loggin_user

        make_user(name="bob", email="bob@domain.b.com", password="*")
        alice = make_user(name="alice", email="alice@domain.a.com", password="*")
        eve = make_user(name="eve", email="eve@domain.a.com", password="*")

        response = client.get(
            "/user/search?name=&email=domain.a", **payload(token=token)
        )
        expect_success(response, [alice.summary(), eve.summary()], code=200)
