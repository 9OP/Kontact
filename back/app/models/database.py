from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy import exc as sql_exc
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
        except sql_exc.IntegrityError:
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
    def find(cls, **kwargs):
        try:
            return cls.query.filter_by(**kwargs).first()
        except:
            raise apr.ApiError()

    @classmethod
    def find_all(cls, **kwargs):
        try:
            return cls.query.filter_by(**kwargs).all()
        except:
            raise apr.ApiError()

    @classmethod
    def find_one(cls, **kwargs):
        try:
            return cls.query.filter_by(**kwargs).one()
        except sql_exc.SQLAlchemyError:  # Found none or multiple
            raise apr.NotFound(cls.__tablename__)
        except:
            raise apr.ApiError()

    @classmethod
    def search(cls, **kwargs):
        filters = [getattr(cls, col).ilike(f"%{val}%") for col, val in kwargs.items()]
        try:
            return cls.query.filter(*filters).all()
        except:
            raise apr.ApiError()
