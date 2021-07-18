from Cryptodome.PublicKey import RSA
from base64 import b64encode, b64decode
from os import urandom


def bxor(b1: bytes, b2: bytes) -> bytes:
    return bytes([a ^ b for a, b in zip(b1, b2)])


def to_base64(x: bytes) -> str:
    return b64encode(x).decode()


def from_base64(s: str) -> bytes:
    return b64decode(s.encode())


def key_gen(ln=16) -> str:
    return b64encode(urandom(ln)).decode()


def enc(token: bytes) -> tuple[str, str]:
    secret = urandom(len(token))
    return to_base64(bxor(token, secret)), to_base64(secret)


def dec(enc_token: str, secret: str) -> bytes:
    return bxor(from_base64(enc_token), from_base64(secret))


# Used for testing and database seed
def rsa_key_gen(passphrase):
    # Return public key and encrypted private key
    key = RSA.generate(2048)
    pk = key.public_key().export_key("PEM").decode()
    sk = key.export_key(
        "PEM", passphrase=passphrase, protection="PBKDF2WithHMAC-SHA1AndAES256-CBC"
    ).decode()
    return pk, sk
