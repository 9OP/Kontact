import pytest
import app.api_responses as api_res
from config.settings import Config
from tests.conftest import User, UserToken
from tests.factories import user_factory


@pytest.mark.usefixtures("cleandb")
class UserTokenModelSuite:
    @pytest.fixture(autouse=True)
    def setup(self, make_user, make_token, monkeypatch):
        self.mock = monkeypatch.setattr
        self.make_user = make_user
        self.make_token = make_token

    def test_define(self):
        """
        GIVEN a UserToken model
        WHEN a user is fetched
        THEN attrs are correct
        """
        user = self.make_user(**user_factory())
        token = self.make_token(user_id=user.id)
        assert token.user_id == user.id
        assert token.revoked_at is None

    def test_repr(self):
        """
        GIVEN a token instance
        WHEN repr
        THEN return token id
        """
        user = self.make_user(**user_factory())
        token = self.make_token(user_id=user.id)
        assert token.__repr__() == f"<user_token: {token.id}>"

    def test_revoke(self):
        """
        GIVEN a token instance
        WHEN revoked
        THEN revoke date is set
        """
        user = self.make_user(**user_factory())
        token = self.make_token(user_id=user.id)
        token.revoke()
        assert token.revoked_at is not None
        assert token.revoked_at >= token.created_at
        assert token.revoked_at <= token.updated_at

    def test_decode(self):
        """
        GIVEN a token instance
        WHEN decoded
        THEN return user id
        """
        user = self.make_user(**user_factory())
        token = self.make_token(user_id=user.id)
        assert UserToken.decode(token.encode()) == (user.id, token.id)

    def test_fail_decode_revoked(self):
        """
        GIVEN a token instance
        WHEN revoked
        THEN raise TokenExpired on decode
        """
        user = self.make_user(**user_factory())
        token = self.make_token(user_id=user.id)
        token.revoke()
        with pytest.raises(api_res.TokenExpired):
            UserToken.decode(token.encode())

    def test_fail_decode_invalid(self):
        """
        GIVEN a token instance
        WHEN invalid
        THEN raise TokenInvalid on decode
        """
        user = self.make_user(**user_factory())
        token = self.make_token(user_id=user.id).encode()
        self.mock(Config, "SECRET_KEY", "new_secret_key")
        with pytest.raises(api_res.TokenInvalid):
            UserToken.decode(token)

    def test_fail_decode_expired(self):
        """
        GIVEN a token instance
        WHEN exp is passed
        THEN raise TokenExpired one decode
        """
        self.mock(Config, "PAYLOAD_EXPIRATION", -1)  # expire at now-1s
        user = self.make_user(**user_factory())
        token = self.make_token(user_id=user.id)
        with pytest.raises(api_res.TokenExpired):
            UserToken.decode(token.encode())
