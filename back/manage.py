import lib
from flask.cli import FlaskGroup
from app import create_app


cli = FlaskGroup(create_app)


@cli.command("test")
def test(path="tests"):
    lib.test(path)


@cli.command("seed")
def seed():
    lib.seed()


@cli.command("create_db")
def create_db():
    lib.create_db()


if __name__ == "__main__":
    cli()
