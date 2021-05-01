import pytest
from os import urandom
from app.api.helpers import key_gen, enc, dec


def test_key_gen():
    key = key_gen(ln=24)
    assert key
    # should assert len


@pytest.mark.parametrize("data", ["SECRET".encode(), urandom(16)])
def test_enc_dec(data):
    cipher, secret = enc(data)
    assert cipher
    assert secret
    assert data == dec(cipher, secret)
