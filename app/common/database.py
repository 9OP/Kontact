from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.inspection import inspect
from sqlalchemy import exc as sql_exc
from datetime import datetime
import app.common.api_response as api_res

db = SQLAlchemy()
bcrypt = Bcrypt()


class GenericMixin(object):
    __protected__ = []  # By default

    def serialize(self, *args):
        clear = [a for a in args if a not in self.__protected__]
        return {c: getattr(self, c) for c in inspect(self).attrs.keys() if c in clear}

    # @staticmethod
    # def serialize_list(l, *args):
    #     return [m.serialize(args) for m in l]

    @classmethod
    def create(cls, **kwargs):
        new = cls(**kwargs)
        try:
            db.session.add(new)
            db.session.commit()
            return new
        except sql_exc.IntegrityError:  # Unique constraint
            db.session.rollback()
            raise api_res.ResourceAlreadyExists(cls.__tablename__)
        except sql_exc.SQLAlchemyError:  # Default error
            db.session.rollback()
            raise api_res.ApiError()

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        try:
            db.session.commit()
            return self
        except sql_exc.IntegrityError:  # Unique constraint
            db.session.rollback()
            raise api_res.ResourceAlreadyExists(self.__tablename__)
        except sql_exc.SQLAlchemyError:  # Default error
            db.session.rollback()
            raise api_res.ApiError()

    @classmethod
    def find(cls, **kwargs):
        try:
            res = cls.query.filter_by(**kwargs).first()
        except sql_exc.SQLAlchemyError:
            raise api_res.ApiError()
        else:
            return res


class TimestampMixin(object):
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
