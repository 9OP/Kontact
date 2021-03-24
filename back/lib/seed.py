from app.models import User, Channel, Membership
from faker import Faker
from random import randint, sample
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
    n_user, n_channel = 50, 20

    for _ in progress(range(n_user), prefix="Users:", suffix=f"/{n_user}"):
        users.append(
            User.create(
                name=faker.name(),
                email=faker.unique.email(),
                password="Abc123*",
            )
        )

    for _ in progress(range(n_channel), prefix="Channels:", suffix=f"/{n_channel}"):
        channels.append(Channel.create(name=faker.unique.company()))

    admin = User.create(
        name="Martin",
        email="admin@mail.com",
        password="Abc123*",
        access=2,
    )

    for channel in progress(
        channels, prefix="Memberships:", suffix=f"/{len(channels)}"
    ):
        Membership.create(user_id=admin.id, channel_id=channel.id, role=1)
        for user in sample(users, 10):
            Membership.create(
                user_id=user.id, channel_id=channel.id, role=randint(0, 1)
            )

    print("> Database seeded!")
