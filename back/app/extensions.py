from flask.json import JSONEncoder
from uuid import UUID


class JSON_Improved(JSONEncoder):
    """Improved / custom json encoder"""

    def default(self, obj):
        if isinstance(obj, UUID):
            return str(obj)
        return JSONEncoder.default(self, obj)
