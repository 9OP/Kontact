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
    os.environ["FLASK_ENV"] = "testing"
    os.system("pytest tests/")
    # pytest main has a problem to build coverage
    # pytest.main(["tests/"])


if __name__ == "__main__":
    cli()
