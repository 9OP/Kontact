import os
import subprocess
from flask.cli import FlaskGroup
from app.models.database import db
from app.models import User, Channel, Membership
from app import create_app


cli = FlaskGroup(create_app)


@cli.command("test")
def test(path="tests"):
    """
    Run tests with Pytest.
    :param path: Test path
    :return: Subprocess call result
    """
    os.environ["FLASK_ENV"] = "testing"
    cmd = "pytest {0}".format(path)
    return subprocess.call(cmd, shell=True)


@cli.command("seed")
def seed():
    """
    Seed database with fake data
    """
    admin = User.create(
        name="Admin",
        email="admin@mail.com",
        password="Abc123*",
        access=2,
    )
    user = User.create(
        name="User",
        email="user@mail.com",
        password="Abc123*",
    )
    channel1 = Channel.create(name="Channel_1")
    channel2 = Channel.create(name="Channel_2")

    Membership.create(user_id=user.id, channel_id=channel1.id)
    Membership.create(user_id=user.id, channel_id=channel2.id)
    Membership.create(user_id=admin.id, channel_id=channel1.id)
    Membership.create(user_id=admin.id, channel_id=channel2.id)

    print("Database seeded")


# @cli.command("create_db")
# def create_db():
#     if os.environ["FLASK_ENV"] == "development":
#         db.drop_all()
#         db.create_all()
#         db.session.commit()


if __name__ == "__main__":
    cli()
