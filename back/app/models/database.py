from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, cast, String
from sqlalchemy import exc as sql_exc
from sqlalchemy.orm import exc as sql_orm
from sqlalchemy.inspection import inspect
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime

import app.api_responses as apr


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
    def serialize(self, *args, **kwargs):
        hybrids = [
            item.__name__
            for item in inspect(self.__class__).all_orm_descriptors
            if isinstance(item, hybrid_property)
        ]
        attributes = inspect(self).attrs.keys()
        cols = hybrids + attributes
        return {
            kwargs.get(c, c): getattr(self, c)
            for c in cols
            if c in list(args) + list(kwargs.keys())
        }

    @classmethod
    def create(cls, **kwargs):
        new = cls(**kwargs)
        try:
            db.session.add(new)
            db.session.commit()
            return new
        except sql_exc.IntegrityError as e:
            db.session.rollback()
            raise apr.AlreadyExists(cls.__tablename__)

    def update(self, **kwargs):
        try:
            for k, v in kwargs.items():
                setattr(self, k, v)
            db.session.commit()
            return self
        except sql_exc.IntegrityError:
            db.session.rollback()
            raise apr.AlreadyExists(self.__tablename__)

    def destroy(self):
        db.session.delete(self)
        db.session.commit()
        return self

    @classmethod
    def __find(cls, switch, *args, **kwargs):
        query = cls.query
        try:
            switcher = {
                "first": query.filter_by(**kwargs).first,
                "all": query.filter_by(**kwargs).all,
                "one": query.filter_by(**kwargs).one,
                "search": query.filter(*args).all,
            }
            return switcher[switch]()
        except sql_orm.NoResultFound:
            raise apr.NotFound(cls.__tablename__)
        except Exception as e:
            raise apr.ApiError(description=str(e))

    @classmethod
    def find(cls, **kwargs):
        return cls.__find(switch="first", **kwargs)

    @classmethod
    def find_all(cls, **kwargs):
        return cls.__find(switch="all", **kwargs)

    @classmethod
    def find_one(cls, **kwargs):
        return cls.__find(switch="one", **kwargs)

    @classmethod
    def search(cls, **kwargs):
        # Cast is required for comparing UUIDs with strings
        filters = []
        for col, val in kwargs.items():
            filters.append(cast(getattr(cls, col), String(32)).ilike(val))
        return cls.__find("search", *filters)
