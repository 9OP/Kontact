from flask import request, g
from app.models import Channel, User, Membership, Role, Access
from app.api.middlewares import gate
from app.api.helpers import validator, render


CHANNEL_SCHEMA = {
    "name": {
        "type": "string",
        "required": True,
        "empty": False,
        "coerce": str.strip,
    }
}

MEMBER_SCHEMA = {
    "role": {
        "type": "integer",
        "is_role": True,
        "required": False,
    }
}


@gate(access=Access.USER)
def new():
    params = validator(request.json, CHANNEL_SCHEMA)
    new_channel = Channel.create(name=params["name"])
    Membership.create(  # not safe if fail
        user_id=g.current_user.id,
        channel_id=new_channel.id,
        role=Role.MASTER.value,
    )
    return render(new_channel.summary(), code=201)


@gate(access=Access.ADMIN)
def index():
    channels = Channel.find_all()
    return render([c.summary() for c in channels])


@gate(role=Role.MEMBER)
def show(cid):
    channel = Channel.find_one(id=cid)
    return render(channel.summary(verbose=True))


@gate(role=Role.MASTER)
def destroy(cid):
    channel = Channel.find(id=cid)
    if channel:
        channel.destroy()
    return render(f"Channel <{cid}> deleted.")


@gate(access=Access.USER, delegation=True)
def memberships():
    memberships = Membership.find_all(user_id=g.current_user.id)
    return render([m.summary("channel") for m in memberships])


@gate(role=Role.MASTER)
def update(cid):
    params = validator(request.json, CHANNEL_SCHEMA)
    channel = Channel.find(id=cid)
    channel.update(name=params["name"])
    return render(channel.summary())


@gate(role=Role.MASTER)
def add_member(cid, uid):
    channel = Channel.find_one(id=cid)
    user = User.find_one(id=uid)
    membership = Membership.create(user=user, channel=channel)
    return render(membership.summary("user"), code=201)


@gate(role=Role.MASTER)
def delete_member(cid, uid):
    membership = Membership.find(user_id=uid, channel_id=cid)
    if membership:
        membership.destroy()
    return render(f"Membership <{cid}, {uid}> deleted.")


@gate(role=Role.MASTER)
def update_member(cid, uid):
    params = validator(request.json, MEMBER_SCHEMA)
    membership = Membership.find_one(user_id=uid, channel_id=cid)
    membership.update(role=params["role"])
    return render(membership.summary("user"))
