from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy import exc as sql_exc
from sqlalchemy.inspection import inspect
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
import app.api_responses as apr


bcrypt = Bcrypt()

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(metadata=metadata)


class TimestampMixin(object):
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)


class Support(TimestampMixin):
    def serialize(self, *args):
        hybrids = [
            item.__name__
            for item in inspect(self.__class__).all_orm_descriptors
            if isinstance(item, hybrid_property)
        ]
        attributes = inspect(self).attrs.keys()
        cols = hybrids + attributes
        return {c: getattr(self, c) for c in cols if c in args}

    @classmethod
    def create(cls, **kwargs):
        new = cls(**kwargs)
        try:
            db.session.add(new)
            db.session.commit()
            return new
        except sql_exc.IntegrityError:
            db.session.rollback()
            raise apr.AlreadyExists(cls.__tablename__)
        # except sql_exc.SQLAlchemyError:
        #     db.session.rollback()
        #     raise api_res.ApiError()

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        try:
            db.session.commit()
            return self
        except sql_exc.IntegrityError:
            db.session.rollback()
            raise apr.AlreadyExists(self.__tablename__)
        # except sql_exc.SQLAlchemyError:
        #     db.session.rollback()
        #     raise api_res.ApiError()

    @classmethod
    def find(cls, **kwargs):
        try:
            res = cls.query.filter_by(**kwargs).first()
            return res
        except sql_exc.SQLAlchemyError:
            raise apr.ApiError()

    @classmethod
    def find_or_fail(cls, **kwargs):
        try:
            res = cls.query.filter_by(**kwargs).first()
        except sql_exc.SQLAlchemyError:
            raise apr.ApiError()
        else:
            if res is None:
                raise apr.NotFound(cls.__tablename__)
            return res

    @classmethod
    def find_all(cls, **kwargs):
        try:
            res = cls.query.filter_by(**kwargs).all()
            return res
        except sql_exc.SQLAlchemyError:
            raise apr.ApiError()
