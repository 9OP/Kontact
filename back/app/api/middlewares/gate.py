import functools
from uuid import UUID
import app.api_responses as apr
from .authentication import authentication
from .authorization import role_control, access_control


def validate(**kwargs):
    cid = kwargs.get("cid", None)
    uid = kwargs.get("uid", None)

    def validUUID(uuid_to_test):
        try:
            uuid_obj = UUID(uuid_to_test, version=4)
        except ValueError:
            return False
        return str(uuid_obj) == uuid_to_test

    if cid and not validUUID(cid):
        raise apr.InvalidParameter("cid is not a UUID-4")

    if uid and not validUUID(uid):
        raise apr.InvalidParameter("uid is not a UUID-4")


def gate(**gkwargs):
    def decorator(func):
        @functools.wraps(func)
        def secure_function(*args, **kwargs):
            validate(**kwargs)
            authentication(delegation=gkwargs.get("delegation"))

            control_switcher = {
                "role": role_control,
                "access": access_control,
            }

            for rule, control in control_switcher.items():
                if rule in gkwargs.keys():
                    control(**{rule: gkwargs[rule]}, **kwargs)

            return func(*args, **kwargs)

        return secure_function

    return decorator
