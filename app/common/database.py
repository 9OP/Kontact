from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.inspection import inspect
from sqlalchemy import exc as sql_exc
from datetime import datetime
import app.common.api_response as api_res

db = SQLAlchemy()
bcrypt = Bcrypt()


class TimestampMixin(object):
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)


class Support(TimestampMixin):
    def serialize(self, *args):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys() if c in args}

    @classmethod
    def create(cls, **kwargs):
        new = cls(**kwargs)
        try:
            db.session.add(new)
            db.session.commit()
            return new
        except sql_exc.IntegrityError as e:  # Unique constraint
            db.session.rollback()
            print(e)
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
