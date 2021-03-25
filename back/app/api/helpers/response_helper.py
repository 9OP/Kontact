from flask import request, json, jsonify, current_app, g
import app.api_responses as apr
import re


def logger(response):
    user = g.get("current_user", "<Anonymous>")
    current_app.logger.info(
        (
            f"{'-'.join(request.access_route)} {user} :: "
            f"{response.status_code} {request.method} {request.path} :: "
            f"{request.user_agent} :: "
            f"{request.endpoint}"
        )
    )
    return response


def handler(exc):
    app_code = exc.app_code if hasattr(exc, "app_code") else 1000
    payload = {"app_code": app_code, "description": exc.description}
    response = exc.get_response()
    response.content_type = "application/json"
    response.data = json.dumps(payload)
    return response


def render(data=None, code=200, cookie=None):
    if isinstance(data, str):
        data = {"description": data, "app_code": code}
    res = jsonify(data)
    if cookie:
        res.set_cookie(**cookie)
    return res, code


def expect_mimetype(mimetype="application/json", methods=["POST", "PUT"]):
    if request.headers.get("Content-Type") != mimetype and request.method in methods:
        raise apr.ApiError(description=f"Expect {mimetype} mimetype.")


def expect_referer():
    referer = request.headers.get("Referer", "")
    policy = current_app.config.get("REFERER")
    if not re.search(r"{ref}.*".format(ref=policy), referer):
        raise apr.AuthError(description="Private API.")
