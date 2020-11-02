from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.inspection import inspect
from sqlalchemy import exc as sql_exc
from datetime import datetime

from .api_response import *

db = SQLAlchemy()
bcrypt = Bcrypt()


class GenericMixin(object):
    def serialize(self, *keys):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys() if c in keys}

    @classmethod
    def create(cls, **kwargs):
        new = cls(**kwargs)
        try:
            db.session.add(new)
            db.session.commit()
            return new
        except sql_exc.IntegrityError:  # Unique constraint
            db.session.rollback()
            raise ResourceAlreadyExists(cls.__tablename__)
        except sql_exc.SQLAlchemyError:  # Default error
            db.session.rollback()
            raise ApiError()


class TimestampMixin(object):
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
