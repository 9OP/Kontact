import os
from app.models.database import db
from app.models import User, Channel, Membership
from faker import Faker
from random import randint

faker = Faker()


def clear_db():
    print(db.engine)
    value = input("-> clear db? (y/n) ").lower()
    if value == "y" and os.environ.get("FLASK_ENV") == "development":
        db.drop_all()
        db.create_all()
        db.session.commit()
        print("> Database cleared")
    else:
        print("> Database not cleared")

    return value == "y"


def seed():
    """
    Seed database
    """
    if not clear_db():
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
