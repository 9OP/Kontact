from app.models import User, Channel, Membership
from faker import Faker
from random import randint, sample
from .create_db import create_db

faker = Faker()


def seed():
    """
    Seed database
    """
    if not create_db():
        return

    users, channels = [], []
    n_user, n_channel = 1000, 10
    for _ in range(n_user):
        users.append(
            User.create(
                name=faker.name(),
                email=faker.unique.email(),
                password="Abc123*",
            )
        )

    for _ in range(n_channel):
        channels.append(Channel.create(name=faker.unique.company()))

    admin = User.create(
        name="Martin",
        email="admin@mail.com",
        password="Abc123*",
        access=2,
    )

    for channel in channels:
        Membership.create(user_id=admin.id, channel_id=channel.id, role=1)
        for user in sample(users, 10):
            Membership.create(
                user_id=user.id, channel_id=channel.id, role=randint(0, 1)
            )

    print("> Database seeded!")
