from flask import request, g
from app.models import Channel, User, Membership, Role, Access
from app.api.middlewares import gate
from app.api.helpers import validator, render


# Define the structure of encryption material
# scek: secret channel encryption key (stored encrypted with client puek password hash)
# salt: salt used to wrap the scek
# iv: initialization vector of the suek wrap
MATERIAL_SCHEMA = {
    "material": {
        "type": "dict",
        "required": True,
        "schema": {
            "scek": {"type": "string", "required": True, "empty": False},
            "salt": {
                "type": "list",
                "required": True,
                "empty": False,
                "schema": {"type": "integer"},
            },
            "iv": {
                "type": "list",
                "required": True,
                "empty": False,
                "schema": {"type": "integer"},
            },
        },
    },
}

CHANNEL_SCHEMA = {
    "name": {
        "type": "string",
        "required": True,
        "empty": False,
        "coerce": str.strip,
    }
}

CREATE_CHANNEL_SCHEMA = {**CHANNEL_SCHEMA, **MATERIAL_SCHEMA}

MEMBER_SCHEMA = {
    "role": {
        "type": "integer",
        "is_role": True,
        "required": False,
    }
}


@gate(access=Access.USER)
def new():
    params = validator(request.json, CREATE_CHANNEL_SCHEMA)
    new_channel = Channel.create(name=params["name"])
    membership = Membership.create(  # not safe if fail
        user_id=g.current_user.id,
        channel_id=new_channel.id,
        role=Role.MASTER.value,
        material=params["material"],
    )
    data = new_channel.summary()
    data["material"] = membership.material
    return render(data, code=201)


@gate(access=Access.ADMIN)
def index():
    channels = Channel.find_all()
    return render([c.summary() for c in channels])


@gate(role=Role.MEMBER)
def show(cid):
    channel = Channel.find_one(id=cid)
    return render(channel.summary(include_members=True))


@gate(role=Role.MASTER)
def destroy(cid):
    channel = Channel.find(id=cid)
    if channel:
        channel.destroy()
    return render(f"Channel <{cid}> deleted.")


@gate(access=Access.USER, delegation=True)
def memberships():
    memberships = g.current_user.memberships
    if request.args.get("include_pending") == 1:
        memberships += g.current_user.pending_memberships
    return render([m.summary() for m in memberships])


@gate(access=Access.USER)
def join(cid):
    membership = Membership.create(
        user_id=g.current_user.id,
        channel_id=cid,
        pending=True,
    )
    return render(membership.summary(), 201)


@gate(role=Role.MASTER)
def update(cid):
    params = validator(request.json, CHANNEL_SCHEMA)
    channel = Channel.find(id=cid)
    channel.update(name=params["name"])
    return render(channel.summary())


@gate(role=Role.MASTER)
def add_member(cid, uid):
    params = validator(request.json, MATERIAL_SCHEMA)
    channel = Channel.find_one(id=cid)
    user = User.find_one(id=uid)
    if not (membership := Membership.find(user_id=uid, channel_id=cid, pending=True)):
        membership = Membership.create(
            user=user, channel=channel, material=params["material"]
        )
    membership.update(pending=False, material=params["material"])
    return render(membership.summary(), code=201)


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
    return render(membership.summary())
