from flask import request, g
from app.models import Channel, User, Membership
from app.models.membership_model import Role
from app.models.user_model import Access
from app.api.helpers import (
    validator,
    render,
    authentication,
    role_required,
    access_required,
)


CHANNEL_SCHEMA = {
    "name": {
        "type": "string",
        "required": True,
        "empty": False,
    }
}


@authentication
@access_required(Access.USER)
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
@access_required(Access.USER)
def index():
    channels = Channel.find_all()
    return render([c.short() for c in channels])


@authentication
@role_required(Role.MEMBER)
def show(cid):
    channel = Channel.find_one(id=cid)
    return render(channel.summary())


@authentication
@role_required(Role.MASTER)
def destroy(cid):
    channel = Channel.find_one(id=cid)
    channel.destroy()
    return render(f"Channel {channel.name} deleted")


# def update(cid):
#     pass


@authentication
@role_required(Role.MASTER)
def add_member(cid, uid):
    channel = Channel.find_one(id=cid)
    user = User.find_one(id=uid)
    Membership.create(user=user, channel=channel)
    return render(f"{user.name} added to {channel.name}", code=201)


@authentication
@role_required(Role.MASTER)
def del_member(cid, uid):
    channel = Channel.find_one(id=cid)
    user = User.find_one(id=uid)
    membership = Membership.find_one(user_id=user.id, channel_id=channel.id)
    membership.destroy()
    return render(f"Member {user.name} deleted from channel {channel.name}")


# def update_member(cid, uid):
#     pass