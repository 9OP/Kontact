from flask import request
from flask.globals import current_app
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
    # name = request.args.get("name", "")
    # email = request.args.get("email", "")
    # users = sorted(User.search(name=name, email=email), key=similarity(name=name))
    # # print('\n\n\n', name, users, '\n\n\n')
    # message = f"name: {name}, users: {','.join([u.name for u in users[:5]])}"
    # print("name: ", name, "request: ", request.args)
    # current_app.logger.info(message)
    # return render([u.summary() for u in users[:5]])
    value = request.args.get("value", "")
    users = []
    if value and value[0] == "#":
        print("value: ", value)
        users = sorted(User.search(id=value[1:]), key=similarity(id=value[1:]))
    else:
        users = sorted(User.search(name=value), key=similarity(name=value))
    return render([u.summary() for u in users[:5]])
