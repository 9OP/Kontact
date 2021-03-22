from flask import request
from app.models import User, Access
from app.api.middlewares import gate
from app.api.helpers import render, similarity


@gate(access=Access.ADMIN)
def index():
    users = User.find_all()
    return render([u.summary() for u in users])


@gate(access=Access.ADMIN)
def show(uid):
    user = User.find_one(id=uid)
    return render(user.summary())


@gate(access=Access.USER)
def search():
    name = request.args.get("name", "")
    email = request.args.get("email", "")
    users = sorted(User.search(name=name, email=email), key=similarity(name=name))
    return render([u.summary() for u in users[:5]])
