from flask import request, g
from app.models import Channel
from app.api.helpers import validator, render, authentication
import app.api_responses as apr


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
    channel_data = new_channel.serialize(
        "id", "name", "created_at"
    )  # create summary() in models
    return render(channel_data, code=201)


def index():
    channels = Channel.query.filter_by().all()  # find_all in database.py
    channels_data = [c.serialize("id", "name", "created_at") for c in channels]
    return render({"channels": channels_data})


def show(id):
    pass


def update(id):
    pass


def destroy(id):
    pass
