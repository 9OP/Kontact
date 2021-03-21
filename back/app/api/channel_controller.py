from flask import request, g
from app.models import Channel, User, Membership
from app.models.membership_model import Role
from app.models.user_model import Access
from app.api.middlewares import authentication, require
from app.api.helpers import validator, render


CHANNEL_SCHEMA = {
    "name": {
        "type": "string",
        "required": True,
        "empty": False,
    }
}

MEMBER_SCHEMA = {
    "role": {
        "type": "integer",
        "is_role": True,
        "required": False,
    }
}


@authentication
@require(access=Access.USER)
def new():
    params = validator(request.json, CHANNEL_SCHEMA)
    new_channel = Channel.create(name=params["name"])
    Membership.create(  # not safe if fail
        user_id=g.current_user.id,
        channel_id=new_channel.id,
        role=Role.MASTER.value,
    )
    return render(new_channel.summary(), code=201)


@authentication
@require(access=Access.ADMIN)
def index():
    channels = Channel.find_all()
    return render([c.summary() for c in channels])


@authentication
@require(role=Role.MEMBER)
def show(cid):
    channel = Channel.find_one(id=cid)
    return render(channel.summary(verbose=True))


@authentication
@require(role=Role.MASTER)
def destroy(cid):
    channel = Channel.find(id=cid)
    if channel:
        channel.destroy()
    return render(f"Channel <{cid}> deleted")


@authentication
@require(access=Access.USER)
def memberships():
    memberships = Membership.find_all(user_id=g.current_user.id)
    return render([m.summary("channel") for m in memberships])


@authentication
@require(role=Role.MASTER)
def update(cid):
    params = validator(request.json, CHANNEL_SCHEMA)
    channel = Channel.find(id=cid)
    channel.update(name=params["name"])
    return render(channel.summary())


@authentication
@require(role=Role.MASTER)
def add_member(cid, uid):
    channel = Channel.find_one(id=cid)
    user = User.find_one(id=uid)
    membership = Membership.create(user=user, channel=channel)
    return render(membership.summary("user"), code=201)


@authentication
@require(role=Role.MASTER)
def delete_member(cid, uid):
    membership = Membership.find(user_id=uid, channel_id=cid)
    if membership:
        membership.destroy()
    return render(f"Membership <{cid}, {uid}> deleted.")


@authentication
@require(role=Role.MASTER)
def update_member(cid, uid):
    params = validator(request.json, MEMBER_SCHEMA)
    membership = Membership.find_one(user_id=uid, channel_id=cid)
    membership.update(role=params["role"])
    return render(membership.summary("user"))
