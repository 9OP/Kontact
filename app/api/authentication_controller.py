from flask import jsonify, request, make_response
from app.models import User, db
from app.common.errors import *

# Create request validator/parser helper

# Raise error instead of formating error reponse
def signup():
    user = request.json
    existing_user = User.query.filter_by(email=user.get("email")).first()

    # Create new user on a function, do not use db here
    if not existing_user:
        new_user = User(email=user.get("email"), password=user.get("password"))
        db.session.add(new_user)
        db.session.commit()
        raise Success()  # moyen, mieux renvoyer le user
    else:
        raise UserAlreadyExists()


def signin():
    print("hello")
    return "hello"
    # with current_app.app_context():
    # print(request.json)
    # return jsonify(success=True)


def signout():
    return "signout"


def whoami():
    print(request.json)
    # print("whoami!")
    return "hello"