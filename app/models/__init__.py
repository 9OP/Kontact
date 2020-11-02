from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.inspection import inspect
from flask_bcrypt import Bcrypt


# It works because it is imported under app context
CONFIG = current_app.config
db = SQLAlchemy()
bcrypt = Bcrypt()


class Serializer(object):
    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]
