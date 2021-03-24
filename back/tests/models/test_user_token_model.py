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
    token, user = _token
    assert UserToken.decode(token.encode()) == (user.id, token.id)


def test_fail_decode_revoked(_token):
    """
    GIVEN a token instance
    WHEN revoked
    THEN raise TokenExpired on decode
    """
    token, user = _token
    token.revoke()
    with pytest.raises(api_res.TokenExpired):
        UserToken.decode(token.encode())


def test_fail_decode_invalid(_token, monkeypatch):
    """
    GIVEN a token instance
    WHEN invalid
    THEN raise TokenInvalid on decode
    """
    token, _ = _token
    token = token.encode()
    monkeypatch.setattr(Config, "SECRET_KEY", "new_secret_key")
    with pytest.raises(api_res.TokenInvalid):
        UserToken.decode(token)


def test_fail_decode_expired(_token, monkeypatch):
    """
    GIVEN a token instance
    WHEN exp is passed
    THEN raise TokenExpired one decode
    """
    monkeypatch.setattr(Config, "PAYLOAD_EXPIRATION", -1)  # expire at now-1s
    token, _ = _token
    with pytest.raises(api_res.TokenExpired):
        UserToken.decode(token.encode())
