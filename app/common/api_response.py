from flask import json
from werkzeug.exceptions import HTTPException


def generic_handler(exc):
    response = exc.get_response()
    response.data = json.dumps(
        {
            "code": exc.get("app_code", 999),
            "description": exc.get("description", "Generic message."),
        }
    )
    response.content_type = "application/json"
    return response


class GenericResponse(HTTPException):
    def __init__(self, http_code=None, app_code=999, description="Generic message."):
        super().__init__()
        self.code = http_code
        self.app_code = app_code
        self.description = description


class ApiError(GenericResponse):
    def __init__(self, app_code=400, description="Api error."):
        super().__init__(400, app_code, description)


class AuthError(GenericResponse):
    def __init__(self, app_code=401, description="Unauthorized."):
        super().__init__(401, app_code, description)


class NoRouteMatch(GenericResponse):
    def __init__(self, app_code=404, description="No route matches."):
        super().__init__(404, app_code, description)


class ResourceAlreadyExists(ApiError):
    def __init__(self, resource=None):
        description = f"The {resource} already exists."
        super().__init__(409, description)


class MissingParameter(ApiError):
    def __init__(self, parameter=None):
        description = f"Missing parameter: {parameter}."
        super().__init__(410, description)


class InvalidParameter(ApiError):
    def __init__(self, parameter=None):
        description = f"Invalid parameter: {parameter}."
        super().__init__(411, description)


class TokenExpired(ApiError):
    def __init__(self):
        super().__init__(418, "The given token is expired.")


class SignatureExpired(ApiError):
    def __init__(self):
        super().__init__(419, "The token signature is expired.")
