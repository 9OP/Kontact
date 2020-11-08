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
    channels_data = [c.summary() for c in channels]
    return render({"channels": channels_data})


def add_member(cid, uid):
    channel = Channel.find_or_fail(id=cid)
    user = User.find_or_fail(id=uid)
    Membership.create(user=user, channel=channel)
    return render(f"{user.name} added to {channel.name}", code=201)


def get_members(cid):
    channel = Channel.find_or_fail(id=cid)
    members = channel.members
    channel_data = channel.summary()
    channel_data["members"] = [m.summary() for m in members]
    return render(channel_data)


def show(id):
    pass


def update(id):
    pass


def destroy(id):
    pass
