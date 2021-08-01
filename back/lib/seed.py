from app.api.helpers.cryptography_helper import rsa_key_gen
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
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvKyqctNM2Ph7PPCkl7Na"
            "vOopm1Wbvf26wW2WC9eIRsg7M5rZqERo+F3bZg5sPc1uFx1Id79IDOzzlYRmp9Aj"
            "rrudCO4u7O+VdCh36bYP287H5FvgzrSsidCWrluQLDmnzvq3LVHovjalvCzAyMog"
            "OAypgwqRv7P8NPy57zdMsLvaK3wm+/2zQ1oRJzoWqVy9IpdWVOYNTY4blddg5ZQ/"
            "GD85NeE8VHSs+S/caaXjlKc4Wv80D9RpzhV/Rzt8W0cQ8VsxvZmw+lOQKZAq52Bb"
            "5TbejnSeELIj7lKUuddVm8InlB631CtBP29tF1gN9S13IVShptAMq9Pn3x16FEdZ"
            "kwIDAQAB"
        ),
        "suek": (
            "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"
        ),
        "salt": [
            45,
            4,
            34,
            146,
            140,
            132,
            49,
            123,
            96,
            184,
            69,
            183,
            225,
            116,
            125,
            117,
        ],
        "iv": [146, 8, 247, 69, 168, 237, 232, 7, 150, 23, 239, 152],
    }
    membership_material = {
        "scek": "eN75i4yo6yPFB1rzO9hWR794CkJkpnZLABoskckuojhzRJkE5gE4niWl89IZuFSd",
        "salt": [
            61,
            74,
            165,
            208,
            134,
            180,
            0,
            243,
            102,
            250,
            56,
            179,
            178,
            97,
            15,
            211,
        ],
        "iv": [132, 116, 19, 79, 187, 146, 238, 58, 190, 111, 236, 169],
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
