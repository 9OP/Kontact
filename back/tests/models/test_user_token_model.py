import pytest
import app.api_responses as api_res
from app.models import UserToken
from config.settings import Config


def test_define(_token):
    """
    GIVEN a token instance
    WHEN fetched
    THEN attrs are correct
    """
    token, user = _token
    assert token.user_id == user.id
    assert token.revoked_at is None
    assert len(token.token) == 64


def test_repr(_token):
    """
    GIVEN a token instance
    WHEN repr
    THEN return token id
    """
    token, _ = _token
    assert token.__repr__() == f"<user_token: {token.id}>"


def test_revoke(_token):
    """
    GIVEN a token instance
    WHEN revoked
    THEN revoke date is set
    """
    token, _ = _token
    token.revoke()
    assert token.revoked_at is not None
    assert token.revoked_at >= token.created_at
    assert token.revoked_at <= token.updated_at


def test_decode(_token):
    """
    GIVEN a token instance
    WHEN decoded
    THEN return user id
    """
    user_token, user = _token
    assert UserToken.decode(user_token.token) == (user.id, user_token.id)


def test_fail_decode_revoked(_token):
    """
    GIVEN a token instance
    WHEN revoked
    THEN raise TokenExpired on decode
    """
    user_token, user = _token
    user_token.revoke()
    with pytest.raises(api_res.TokenExpired):
        UserToken.decode(user_token.token)


def test_fail_decode_invalid(_token):
    """
    GIVEN an invalid token
    WHEN decode
    THEN raise TokenInvalid
    """
    token = "invalid_token"
    with pytest.raises(api_res.TokenInvalid):
        UserToken.decode(token)


def test_fail_decode_expired(_token, monkeypatch):
    """
    GIVEN a token instance
    WHEN exp is passed
    THEN raise TokenExpired one decode
    """
    monkeypatch.setattr(Config, "TOKEN_EXPIRATION", -1)  # expire at now-1s
    user_token, _ = _token
    with pytest.raises(api_res.TokenExpired):
        UserToken.decode(user_token.token)
