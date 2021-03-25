from flask.json import JSONEncoder
from uuid import UUID
from datetime import datetime


class JSON_Improved(JSONEncoder):
    """Improved / custom json encoder"""

    def default(self, obj):
        if isinstance(obj, UUID):
            return str(obj)
        return JSONEncoder.default(self, obj)


def logger_config(log_name=None):
    name = log_name or datetime.today().strftime("%Y%m%d")
    return {
        "version": 1,
        "formatters": {
            "default": {
                "format": (
                    "%(asctime)s :: "
                    "%(levelname)s :: "
                    "%(threadName)s :: "
                    "%(message)s"
                ),
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "default",
            },
            "file": {
                "class": "logging.FileHandler",
                "filename": f"logs/api_{name}.log",
                "formatter": "default",
                "encoding": "utf8",
            },
        },
        "root": {"level": "INFO", "handlers": ["console", "file"]},
    }
