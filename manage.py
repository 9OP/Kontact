from flask.cli import FlaskGroup
from app import create_app
import os
import pytest

cli = FlaskGroup(create_app)


@cli.command("test")
def test():
    """
    Run tests.
    """
    os.environ["FLASK_ENV"] = "development"
    pytest.main(["tests/"])
    # os.system("echo $FLASK_ENV && pytest ./tests/")
    # pytest.main(["./tests/"])


if __name__ == "__main__":
    cli()
