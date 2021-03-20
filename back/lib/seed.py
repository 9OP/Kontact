from app.models import User, Channel, Membership
from faker import Faker
from random import randint
from .create_db import create_db

faker = Faker()


def seed():
    """
    Seed database
    """
    if not create_db():
        return

    users, channels = [], []
    for _ in range(10):
        channels.append(Channel.create(name=faker.company()))
        users.append(
            User.create(
                name=faker.name(),
                email=faker.email(),
                password="Abc123*",
            )
        )

    admin = User.create(
        name="Martin",
        email="admin@mail.com",
        password="Abc123*",
        access=2,
    )

    for channel in channels:
        Membership.create(user_id=admin.id, channel_id=channel.id, role=1)
        for user in users:
            Membership.create(
                user_id=user.id, channel_id=channel.id, role=randint(0, 1)
            )

    print("> Database seeded!")
