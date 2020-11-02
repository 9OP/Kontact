from flask import json
from werkzeug.exceptions import HTTPException


def generic_handler(e):
    # This base response is an unformated error
    response = e.get_response()
    response.data = json.dumps(
        {"application code": e.app_code, "description": e.description}
    )
    response.content_type = "application/json"
    return response


class GenericError(HTTPException):
    def __init__(self, app_code=None):
        super().__init__()
        self.code = 400  # BAD REQUEST
        self.app_code = app_code
        self.description = "Error"


class ResourceAlreadyExists(HTTPException):
    def __init__(self, resource=None):
        super().__init__()
        self.code = 422  # UNPROCESSABLE ENTITY
        self.description = f"The {resource} already exists."


class InvalidParameter(HTTPException):
    def __init__(self, parameter=None):
        super().__init__()
        self.code = 410
        self.description = f"Invalid parameter: {parameter}."


class MissingParameter(HTTPException):
    def __init__(self, parameter=None):
        super().__init__()
        self.code = 411
        self.description = f"Missing parameter: {parameter}."


class Unauthorized(HTTPException):
    def __init__(self, parameter=None):
        super().__init__()
        self.code = 401
        self.description = f"The request is unauthorized."


class TokenExpired(HTTPException):
    def __init__(self, parameter=None):
        super().__init__()
        self.code = 418
        self.description = f"The given token is expired."


class SignatureExpired(HTTPException):
    def __init__(self, parameter=None):
        super().__init__()
        self.code = 419
        self.description = f"The token signature is expired."


# @app.errorhandler(werkzeug.exceptions.BadRequest)
# def handle_bad_request(e):
#     return 'bad request!', 400

# # or, without the decorator
# app.register_error_handler(400, handle_bad_request)

# class InsufficientStorage(werkzeug.exceptions.HTTPException):
#     code = 507
#     description = "Not enough storage space."


# app.register_error_handler(InsufficientStorage, handle_507)

# raise InsufficientStorage()
