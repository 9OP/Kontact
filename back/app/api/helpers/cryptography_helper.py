import base64
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from config.settings import Config
import app.api_responses as apr


def key(salt: bytes) -> bytes:
    password = Config.SECRET_KEY.encode()
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
    )
    return base64.urlsafe_b64encode(kdf.derive(password))


def encrypt(message: str) -> str:
    salt = base64.b16encode(os.urandom(16))
    try:
        encrypted = Fernet(key(salt)).encrypt(message.encode())
    except:
        raise apr.AuthError(description="Cannot encrypt csrf cookie.")
    return f"{salt.decode()}.{encrypted.decode()}"


def decrypt(message: str) -> str:
    salt, token = message.split(".", 1)
    try:
        decrypted = Fernet(key(salt.encode())).decrypt(token.encode())
    except:
        raise apr.AuthError(description="Csrf cookie is invalid.")
    return decrypted.decode()
