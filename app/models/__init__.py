from flask import current_app
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.inspection import inspect
from sqlalchemy import exc as sql_exc
from app.common.errors import *
from datetime import datetime


# It works because it is imported under app context
CONFIG = current_app.config
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
        except sql_exc.IntegrityError:  # Unique constrqint
            db.session.rollback()
            raise ResourceAlreadyExists(cls.__tablename__)
        except sql_exc.SQLAlchemyError:  # Default error
            db.session.rollback()
            raise InvalidParameter(cls.__tablename__)


class TimestampMixin(object):
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
