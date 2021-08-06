from app.models import User, Channel, Membership
from faker import Faker
from random import randint, sample
from hashlib import sha256
from .create_db import create_db


def progress(
    iterable, prefix="", suffix="", decimals=1, length=50, fill="#", printEnd="\r"
):
    total = len(iterable)

    def printProgressBar(iteration):
        filledLength = int(length * iteration // total)
        bar = fill * filledLength + "-" * (length - filledLength)
        print(f"\r  {prefix:<12} |{bar}| {iteration}{suffix}", end=printEnd)

    printProgressBar(0)
    for i, item in enumerate(iterable):
        yield item
        printProgressBar(i + 1)
    print()


faker = Faker()


def seed():
    """
    Seed database
    """
    if not create_db():
        return

    print("> Seeding database...")

    users, channels = [], []
    n_user, n_channel = 10, 4
    password = sha256(
        sha256("123456".encode()).hexdigest().encode()
    ).hexdigest()  # "123456" hashed 2 times by the front
    user_material = {
        "puek": (
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2hFDWV7z6PwPaGgXq2kM"
            "9SRyw+0Zf9i3eMNwIAYAHLUgqUYuvzyHzOJNDl/e0rYtys21tZAAcPlNwyktDvH7"
            "NyjuHJQgPqxXMCPSSOz/oIpsLuEB4ewxSSyfCVFRhuc5vMmYFV9hA9+U2+mWdhBf"
            "OtcqytR5ZLmLv6eJDWv6r2mOxI0D8X9Q1G3WaZ1D0CRUe0ooIxLzX2wAAqO5c4Xz"
            "mYUJsH/L2/yLmYfdxeiQSHIX/8ajEexd2ugqTcfuZupOoK/OouFTLBfrJacuxU/t"
            "B1xRCTTYRMbmBCc/fU5pVNbHzI6ASv+zI4C/uwZDpqYTOjKonZCugnD5ERkrJnv9"
            "5QIDAQAB"
        ),
        "suek": (
            "WRjshGS4J6hHHF/jbovvdqdNap8380NMQhPGTgdguY4Ff5o1KSIbCU6QR+VV3+7y"
            "0WjKgzhP9xSzLBUjC/OblbktnUqcVC1/V6xtTNcyY4A7rdAdN0P5th4mhouXRIbS"
            "jZXKiCQ4TbrBQi6ukD394p2TEHn8CsC70/GD9PJrb81QSXvZvJnXTTjCdSBZ+Glm"
            "fOAah2VdNQTPRnajcM1PAOz8gLcjRocjBltZLMZ5qNIlFcPkwtJ+hFLwQANiT4vZ"
            "9oZc8f7gq+UR2X4aRbXMEtgeyPF5pfIy63bkBV2Aiof1unBHQWsgaMYCloHA43Sc"
            "sIe3z2zlxCsE2+CM+peAiBSnH7y8Y9Fx0xUKx5jrRa3kH+PC8m1OmfdDyFpOyTh/"
            "9BCsBdauC6lbJGkgTOK+BQ0bDgWxCtkJXyoPK2S5rgU01zYJlqsevEgTXIQulC4N"
            "eC+u0qBZznx3ahUp8g3ngwQxDSdCaL4yg4axn/yvAOsuVaQuPQm4YlW19/3Jkh59"
            "r8id0mfCpvB02kO6C8cUPqRyf9e0tjkCWiioCUUes6WApSzcpfGcY7767tvWf88z"
            "H56vc/XyDwft4qFLrozOYYw/WWKQSOLFQWsmAqz3CaeSw6CzFvA8yg2YGNYZ5mdz"
            "vRWdoUhESuP1hNd/Q24OgPyVtq1MMNMUTPDJb+AVBhA25EJeEehmlywciNw0u4c4"
            "A/Qfb6XN8iuFoAhaRFXf5LDA7vFQUBcWzPOEcQ5Vs46zmJPrk845lB7b8690LR+U"
            "C22dTTMxfMsKalesIn0G+XAe0y0UB+C4myECFB0BfY6juv+Rg34X5+HuocjPEea/"
            "vbsytSYBwAJN0bNU8JHkedrVD7D9CJRAbF7923FgrnaA6YX3HBXQImE22Vv4PxFs"
            "FzgZjZ11OLhBZkJAJxvxwwFuN3IqrYNl2p8lmcV1GEYjtJrz9TCQ5f7NHUbZ3M9W"
            "vILdQzTLvdVj5uv3wR7fF3wX166NEtISo9A56BtsdEuydT9qGSNrGf39LJU5pg/q"
            "0jDbxXochTfqqnizF2snhZTN5jiII4IgOvB6OBXlGeN9/heHsdQ3LUUGZoQHupCs"
            "TdvmgAcD1TAG8HqbbeBHsedzpdh68H02q/kkHsgDUL66qyBxCfw+CIxN3muMH3X+"
            "TXJy9n+fGxC5HqkFiWRdtfO/y53/hWEv6mQMT2kv12POENmBxDb+9SMoobIAV3kK"
            "PXZeuG4O79NjrqJPk3P+Z3EojdVeXPCwyFt7A9Edpr3YXo57k2z5E3jkoDyaHdoG"
            "lvLk6zsOylFC1z5/lPZh9EiN1Qng+Lukkua8Mi07RpwLq+IBsdPQaKnR+CQqilDe"
            "6mcSOUU49pI3n4mMGE0RJwijKU2qEPXSp3NkdjJ21WWgC4IiU8c18Zty7VovINqI"
            "vvF3zqvm27xUu4grV3i33P+1C3AHVH1T+8nSjOZwt04AXDRxnJzrDZf5P9iUL8Xk"
            "atbmyv321rxc8jbKOKj8i2TA7Wt36zaVTIb7CCJBE8Yo8CTuE2UsfxQBS1CiwwjD"
            "gzWKLTg1VZC43W3xqh8Bt3+jo5MKGZcB0YeB4J/fma2u+UXCi1I2dHASmjNJRyOh"
            "7OGKEZU8UIXDbxcSwr6nG5FdhZDApr0UCh/GhIwXYU01"
        ),
        "salt": [183, 150, 54, 203, 81, 84, 199, 56, 10, 80, 30, 199, 120, 36, 17, 129],
        "iv": [75, 39, 28, 180, 113, 137, 14, 207, 202, 17, 1, 253],
    }
    membership_material = {
        "scek": (
            "VithLdJtDHSgnpmDDm1qNjGNvaBo9MMCSYF3tSGMsY6K910CpnPqqxp9UvJ1oYMC"
            "/MREHKXMNOSG+RG68NqnHyLFlJJkjLXsEZTPw2DJ/JLIsS5SRM9SfoQQfPoI0JVT"
            "dPzQCgWm4Gs48w/SoMogxZDOz4VbX8zblkhhVojsHvrMYO6xNPLk9/UFO432iy4H"
            "wcj80THS8UzLg/T6F5CT9dNWYG+VvdV8XMfWHLKUrBG7zp8HG8kFCqQQV1vFCOpn"
            "qpNhjyZqKF/QyvizeoxwEYHEYNuNpyDUORzeyL0iAAQZPT3fxMezrBLGeyRWOcmM"
            "qMaT7+tb/+E28cSkLhfQ8g=="
        ),
    }

    for _ in progress(range(n_user), prefix="Users:", suffix=f"/{n_user}"):
        users.append(
            User.create(
                name=faker.name(),
                email=faker.unique.email(),
                password=password,
                material=user_material,
            )
        )

    for _ in progress(range(n_channel), prefix="Channels:", suffix=f"/{n_channel}"):
        channels.append(Channel.create(name=faker.unique.company()))

    admin = User.create(
        name="Martin",
        email="admin@mail.com",
        password=password,
        access=2,
        material=user_material,
    )

    for channel in progress(
        channels, prefix="Memberships:", suffix=f"/{len(channels)}"
    ):
        Membership.create(
            user_id=admin.id,
            channel_id=channel.id,
            role=1,
            material=membership_material,
        )
        for user in sample(users, 5):
            Membership.create(
                user_id=user.id,
                channel_id=channel.id,
                role=randint(0, 1),
                material=membership_material,
            )

    print("> Database seeded!")
