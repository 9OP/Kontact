import os
import subprocess
from flask.cli import FlaskGroup
from app.models.database import db
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


if __name__ == "__main__":
    cli()
