import pytest
import app.api_responses as api_res
from app.api.middlewares import gate
from flask import session, g


class TestSuiteAuthentication:
    @pytest.fixture
    def no_token_context(self, app):
        with app.test_request_context():
            yield app

    @pytest.fixture
    def token_context(self, app, _token):
        token, user = _token
        with app.test_request_context(
            headers={"Authorization": f"Bearer {token.encode()}"}
        ):
            yield app, user, token

    def test_fail_token_not_set(self, no_token_context):
        """
        GIVEN gate
        WHEN token not set
        THEN raise AuthError
        """

        @gate()
        def fn():
            return "ok"

        with pytest.raises(api_res.AuthError):
            fn()

    def test_fail_session_not_set(self, token_context):
        """
        GIVEN gate
        WHEN token set but session not set
        THEN raise AuthError
        """

        @gate()
        def fn():
            return "ok"

        with pytest.raises(api_res.AuthError):
            fn()

    def test_fail_token_revoked(self, token_context):
        """
        GIVEN gate
        WHEN token set but revoked
        THEN raise TokenExpired
        """
        _, _, token = token_context
        token.revoke()

        @gate()
        def fn():
            return "ok"

        with pytest.raises(api_res.TokenExpired):
            fn()

    def test_gate(self, token_context):
        """
        GIVEN gate
        WHEN token set and session set
        THEN ok
        """
        _, user, _ = token_context
        session["user_id"] = user.id

        @gate()
        def fn():
            return "ok"

        assert fn() == "ok"

    def test_gate_delegation(self, token_context):
        """
        GIVEN gate with delegation
        WHEN token set
        THEN ok
        """

        @gate(delegation=True)
        def fn():
            return "ok"

        assert fn() == "ok"
