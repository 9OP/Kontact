from flask import g
from app.models import Membership, Role, Access
import app.api_responses as apr


def role_control(role=Role.MASTER, **kwargs):
    cid = kwargs.get("cid")
    if g.current_user.access == Access.ADMIN.value or not cid:
        return

    uid = g.current_user.id
    membership = Membership.find(user_id=uid, channel_id=cid)

    if not membership:
        raise apr.AccessError(description="Membership required.")

    if membership.role < role.value:
        raise apr.AccessError(description=f"Role <{role.name}> required.")


def access_control(access=Access.ADMIN, **kwargs):
    if g.current_user.access < access.value:
        raise apr.AccessError(description=f"Access <{access.name}> required.")
