import pytest
from app.models import User, UserToken
import app.common.api_response as api_res


user_data = {
    "email": "user@mail.com",
    "name": "user",
    "password": "123abcABC#$%",
}


@pytest.mark.usefixtures("database")
class UserTokenModelSuite:
    @pytest.fixture(autouse=True)
    def _base(self, make_user, make_token):
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

    def test_create(self):
        pass

    def test_find(self):
        pass

    def test_decode(self):
        """
        GIVEN a UserToken model
        WHEN a token is decoded
        THEN decoded value is user id
        """
        assert UserToken.decode(self.token.token) == self.user.id

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
            UserToken.decode(self.token.token)

    def test_fail_decode_expired(self):
        pass
