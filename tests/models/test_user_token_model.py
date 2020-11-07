import pytest
import app.api_responses as api_res
from tests.conftest import User, UserToken
from tests.factories import user_factory
from app.config import Config


@pytest.mark.usefixtures("database")
class UserTokenModelSuite:
    @pytest.fixture(autouse=True)
    def _base(self, make_user, make_token, monkeypatch):
        self.mock = monkeypatch.setattr
        user_data = user_factory()
        self.user = make_user(**user_data)
        self.token = make_token(user_id=self.user.id)
        self.make_user = make_user
        self.make_token = make_token

    def test_define(self):
        """
        GIVEN a UserToken model
        WHEN a token is already defined
        THEN check the user_id, revoke_at are defined correctly
        """
        assert self.token.user_id == self.user.id
        assert self.token.revoked_at is None

    def test_repr(self):
        """
        GIVEN a UserToken model
        WHEN a token is defined
        THEN check repr
        """
        assert self.token.__repr__() == f"<user_token: {self.token.id}>"

    def test_decode(self):
        """
        GIVEN a UserToken model
        WHEN a token is decoded
        THEN decoded value is user id
        """
        assert self.token.decode() == self.user.id

    def test_revoke(self):
        """
        GIVEN a UserToken model
        WHEN a token is revoked
        THEN then revoke date is set
        """
        self.token.revoke()
        assert self.token.revoked_at is not None
        assert self.token.revoked_at >= self.token.created_at
        assert self.token.revoked_at <= self.token.updated_at

    def test_fail_decode_revoked(self):
        """
        GIVEN a UserToken model
        WHEN a token is revoked
        THEN then raise error when decode
        """
        self.token.revoke()
        with pytest.raises(api_res.TokenExpired):
            self.token.decode()

    def test_fail_decode_invalid(self):
        """
        GIVEN a UserToken model
        WHEN a token is invalid
        THEN then raise error when decode
        """
        self.mock(Config, "SECRET_KEY", "new_secret_key")
        with pytest.raises(api_res.TokenInvalid):
            self.token.decode()

    def test_fail_decode_expired(self):
        """
        GIVEN a UserToken model
        WHEN a token signature expired
        THEN then raise error when decode
        """
        self.mock(Config, "PAYLOAD_EXPIRATION", -1)  # expire at now-1s
        new_token = self.make_token(user_id=self.user.id)
        with pytest.raises(api_res.TokenExpired):
            new_token.decode()
