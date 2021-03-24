import functools
from .authentication import authentication
from .authorization import role_control, access_control


def gate(**gkwargs):
    def decorator(func):
        @functools.wraps(func)
        def secure_function(*args, **kwargs):
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
