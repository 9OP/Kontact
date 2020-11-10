import functools
from flask import request, g
import app.api_responses as apr
from app.models import Membership
from app.models.membership_model import Role
from app.models.user_model import Access


def role_required(role):
    def decorator(func):
        @functools.wraps(func)
        def secure_function(*args, **kwargs):
            membership = Membership.find(
                user_id=g.current_user.id, channel_id=kwargs["cid"]
            )

            if g.current_user.access == Access.ADMIN.value:
                return func(*args, **kwargs)

            if not membership:
                raise apr.AccessError(
                    description="User is not a member of the channel."
                )

            if membership.role < role.value:
                raise apr.AccessError(
                    description=f"Role <{Role(role.value).name}> required."
                )

            return func(*args, **kwargs)

        return secure_function

    return decorator


def access_required(access):
    def decorator(func):
        @functools.wraps(func)
        def secure_function(*args, **kwargs):

            if g.current_user.access < access.value:
                raise apr.AccessError(
                    description=f"Access <{Access(access.value).name}> required."
                )

            return func(*args, **kwargs)

        return secure_function

    return decorator
