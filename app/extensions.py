from flask.json import JSONEncoder
from uuid import UUID


class JSON_Improved(JSONEncoder):
    """Improved / custom json encoder"""

    def default(self, obj):
        try:
            if isinstance(obj, UUID):
                return str(obj)
        except TypeError:
            pass
        return JSONEncoder.default(self, obj)
