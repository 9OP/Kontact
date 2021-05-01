from flask.json import JSONEncoder
from uuid import UUID
from datetime import datetime


class JSON_Improved(JSONEncoder):
    """Improved / custom json encoder"""

    def default(self, obj):
        if isinstance(obj, UUID):
            return str(obj)
        return JSONEncoder.default(self, obj)


def logger_config(prefix="api", name=None):
    name = name or datetime.today().strftime("%Y%m%d")
    return {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(message)s",
                "datefmt": "%Y-%m-%d %H:%M:%S",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "default",
            },
            "file": {
                "class": "logging.FileHandler",
                "filename": f"logs/{prefix}_{name}.log",
                "formatter": "default",
                "encoding": "utf8",
            },
        },
        "loggers": {
            "gunicorn": {
                "level": "WARNING",
                "propagate": False,
                "handlers": ["file"],
            },
            # "gunicorn": {
            #     "level": "INFO",
            #     "propagate": False,
            #     "handlers": ["file"],
            # },
        },
        "incremental": False,
        "disable_existing_loggers": False,
        "root": {"level": "INFO", "handlers": ["file"]},
        # "root": {"level": "WARNING", "handlers": ["file"]},
        # "root": {"level": "ERROR", "handlers": ["file"]},
        # "root": {"level": "INFO", "handlers": ["console", "file"]},
    }
