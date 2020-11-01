from flask import json
from werkzeug.exceptions import HTTPException


def generic_handler(e):
    response = e.get_response()
    response.data = json.dumps(
        {
            "code": e.code,
            "description": e.description,
        }
    )
    response.content_type = "application/json"
    return response


class Success(HTTPException):
    code = 200
    description = "Success"


class UserAlreadyExists(HTTPException):
    code = 401
    description = "The user already exists."


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
