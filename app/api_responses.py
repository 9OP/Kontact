from werkzeug.exceptions import HTTPException


# Meta Error (Do not instanciate this class)
class ApiResponse(HTTPException):
    def __init__(self, http_code=None, app_code=None, description=None):
        super().__init__()
        self.code = http_code
        self.app_code = app_code
        self.description = description


# 400 - Base api error
class ApiError(ApiResponse):
    def __init__(self, app_code=400, description="Api error."):
        super().__init__(400, app_code, description)


# 401 - Authentication error
class AuthError(ApiResponse):
    def __init__(self, app_code=401, description="Unauthenticated."):
        super().__init__(401, app_code, description)


# 403 - Access denied error
class AccessError(ApiResponse):
    def __init__(self, app_code=403, description="Access denied."):
        super().__init__(403, app_code, description)


# [400] -
class AlreadyExists(ApiError):
    def __init__(self, resource):
        super().__init__(410, f"The {resource} already exists.")


# [400] -
class InvalidParameter(ApiError):
    def __init__(self, parameter):
        super().__init__(411, f"Invalid parameter: {parameter}.")


# [401] -
class LoginFailed(AuthError):
    def __init__(self):
        super().__init__(419, "The password or email is wrong")


# [401] -
class TokenInvalid(AuthError):
    def __init__(self):
        super().__init__(420, "The token is invalid.")


# [401] -
class TokenExpired(AuthError):
    def __init__(self):
        super().__init__(421, "The token is expired.")
