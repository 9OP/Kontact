from flask import request, g
from app.models import Channel, User, Membership
from app.api.helpers import validator, render, authentication
import app.api_responses as apr
from app.models.database import db


CHANNEL_SCHEMA = {
    "name": {
        "type": "string",
        "required": True,
        "empty": False,
    }
}


def create():
    params = validator(request.json, CHANNEL_SCHEMA)
    new_channel = Channel.create(name=params["name"])
    return render(new_channel.summary(), code=201)


def index():
    channels = Channel.find_all()
    channels_data = [
        c.serialize("id", "name", "created_at", "members_count") for c in channels
    ]
    return render({"channels": channels_data})


def show(cid):
    channel = Channel.find_or_fail(id=cid)
    channel_data = channel.summary()
    return render(channel_data)


def destroy(cid):
    channel = Channel.find_or_fail(id=cid)
    channel.destroy()
    return render(f"Channel {channel.name} deleted")


def update(cid):
    pass


def add_member(cid, uid):
    channel = Channel.find_or_fail(id=cid)
    user = User.find_or_fail(id=uid)
    Membership.create(user=user, channel=channel)
    return render(f"{user.name} added to {channel.name}", code=201)


def del_member(cid, uid):
    channel = Channel.find_or_fail(id=cid)
    user = User.find_or_fail(id=uid)
    membership = Membership.find(user_id=user.id, channel_id=channel.id)
    membership.destroy()
    return render(f"Member {user.name} deleted from channel {channel.name}")
