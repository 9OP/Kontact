import os
from app.models.database import db


def create_db():
    print(db.engine.url)
    value = input("-> clear db? (y/n) ").lower()
    if value == "y" and os.environ.get("FLASK_ENV") == "development":
        db.drop_all()
        db.create_all()
        db.session.commit()
        print("> Database created")
    else:
        print("> Database already exists")

    return value == "y"
