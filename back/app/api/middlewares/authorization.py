import functools
from flask import request, g
from app.models import Membership
from app.models.membership_model import Role
from app.models.user_model import Access
import app.api_responses as apr


def require(**rkwargs):
    def decorator(func):
        @functools.wraps(func)
        def secure_function(*args, **kwargs):
            # Not doing anything
            def dummy():
                pass

            # Channel role requirement
            def require_role(role):
                uid = g.current_user.id
                cid = kwargs.get("cid")

                if g.current_user.access == Access.ADMIN.value:
                    return

                if not cid:
                    return

                membership = Membership.find(user_id=uid, channel_id=cid)

                if not membership:
                    raise apr.AccessError(
                        description="User is not a member of the channel."
                    )

                if membership.role < role.value:
                    raise apr.AccessError(
                        description=f"Role <{Role(role.value).name}> required."
                    )

            # User access requirement
            def require_access(access):
                if g.current_user.access < access.value:
                    raise apr.AccessError(
                        description=f"Access <{access.name}> required."
                    )

            require_switcher = {
                "role": require_role,
                "access": require_access,
            }

            for req in rkwargs:
                require_func = require_switcher.get(req, dummy)
                require_func(rkwargs.get(req))

            return func(*args, **kwargs)

        return secure_function

    return decorator
