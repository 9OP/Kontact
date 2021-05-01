import pytest
import app.api_responses as api_res
from app.models import Access, Role
from app.api.middlewares import gate
from flask import session, g


class TestGateAuthentication:
    @pytest.fixture
    def no_token_context(self, app):
        with app.test_request_context():
            yield app

    @pytest.fixture
    def token_context(self, app, _token):
        user_token, user = _token
        with app.test_request_context(
            headers={"Authorization": f"Bearer {user_token.token}"}
        ):
            yield app, user, user_token

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
        _, user, token = token_context
        session["user_id"] = user.id

        @gate()
        def fn():
            return "ok"

        assert fn() == "ok"
        assert g.current_user == user
        assert g.auth_token == token

    def test_gate_delegation(self, token_context):
        """
        GIVEN gate with delegation
        WHEN token set
        THEN ok
        """
        _, user, token = token_context

        @gate(delegation=True)
        def fn():
            return "ok"

        assert fn() == "ok"
        assert g.current_user == user
        assert g.auth_token == token


class TestGateAccess:
    @pytest.fixture
    def context(self, app, _token):
        user_token, user = _token
        with app.test_request_context(
            headers={"Authorization": f"Bearer {user_token.token}"}
        ):
            session["user_id"] = user.id
            yield app, user, user_token

    def test_fail_access(self, context):
        """
        GIVEN gate access control
        WHEN user access is low
        THEN raise AccessError
        """

        @gate(access=Access.ADMIN)
        def fn():
            return "ok"

        with pytest.raises(api_res.AccessError):
            fn()

    def test_gate_access_user(self, context):
        """
        GIVEN gate access control
        WHEN user access is right
        THEN ok
        """

        @gate(access=Access.USER)
        def fn():
            return "ok"

        assert fn() == "ok"

    def test_gate_access_admin(self, context):
        """
        GIVEN gate and access control
        WHEN user access is elevated
        THEN ok
        """
        _, user, _ = context
        user.update(access=Access.ADMIN)

        @gate(access=Access.ADMIN)
        def fn():
            return "ok"

        assert fn() == "ok"


class TestGateRole:
    @pytest.fixture
    def data(self, _user, _channel, make_membership):
        user, _ = _user
        channel, _ = _channel
        return user, channel

    @pytest.fixture
    def context(self, app, data, make_token, make_membership):
        user, channel = data
        membership = make_membership(user_id=user.id, channel_id=channel.id)
        user_token = make_token(user_id=user.id)
        with app.test_request_context(
            headers={"Authorization": f"Bearer {user_token.token}"}
        ):
            session["user_id"] = user.id
            yield user, channel, membership

    @pytest.fixture
    def no_membership_context(self, app, data, make_token):
        user, channel = data
        user_token = make_token(user_id=user.id)
        with app.test_request_context(
            headers={"Authorization": f"Bearer {user_token.token}"}
        ):
            session["user_id"] = user.id
            yield user, channel

    def test_fail_role(self, context):
        """
        GIVEN gate and role control
        WHEN user role is low
        THEN raise AccessError
        """
        _, channel, _ = context

        @gate(role=Role.MASTER)
        def fn(cid):
            return "ok"

        with pytest.raises(api_res.AccessError):
            fn(cid=channel.id)

    def test_admin_granted(self, context):
        """
        GIVEN gate and role control
        WHEN user access is admin
        THEN ok
        """
        user, channel, _ = context
        user.update(access=Access.ADMIN)

        @gate(role=Role.MASTER)
        def fn(cid):
            return "ok"

        assert fn(cid=channel.id) == "ok"

    def test_fail_no_membership(self, no_membership_context):
        """
        GIVEN gate with role control
        WHEN user is not a member
        THEN raise AccessError
        """
        _, channel = no_membership_context

        @gate(role=Role.MEMBER)
        def fn(cid):
            return "ok"

        with pytest.raises(api_res.AccessError):
            fn(cid=channel.id)

    def test_role_elevated(self, context):
        """
        GIVEN gate with role control
        WHEN user role is elevated
        THEN ok
        """
        _, channel, membership = context
        membership.update(role=Role.MASTER)

        @gate(role=Role.MASTER)
        def fn(cid):
            return "ok"

        assert fn(cid=channel.id) == "ok"
