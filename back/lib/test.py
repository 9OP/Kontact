import os
import subprocess


def test(path):
    """
    Run tests with Pytest.
    :param path: Test path
    :return: Subprocess call result
    """
    os.environ["FLASK_ENV"] = "testing"
    cmd = "pytest {0}".format(path)
    return subprocess.call(cmd, shell=True)
