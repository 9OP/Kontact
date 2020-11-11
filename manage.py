import os
from flask.cli import FlaskGroup
from app.models.database import db
from app import create_app


cli = FlaskGroup(create_app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("test")
def test():
    """
    Run tests.
    """
    os.environ["FLASK_ENV"] = "testing"
    os.system("pytest tests/")
    # pytest main has a problem to build coverage
    # pytest.main(["tests/"])


if __name__ == "__main__":
    cli()
