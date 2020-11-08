from flask import request, json, jsonify
import app.api_responses as apr


def handler(exc):
    app_code = exc.app_code if hasattr(exc, "app_code") else 1000
    payload = {"app_code": app_code, "description": exc.description}
    response = exc.get_response()
    response.content_type = "application/json"
    response.data = json.dumps(payload)
    return response


def render(res=None, code=200):
    if isinstance(res, dict) or isinstance(res, list):
        return jsonify(res), code
    else:
        return jsonify({"app_code": 200, "description": res or "success"}), code


def expect_mimetype(mimetype="application/json", methods=["POST", "PUT"]):
    if request.headers.get("Content-Type") != mimetype and request.method in methods:
        raise apr.ApiError(description=f"Expect {mimetype} mimetype.")
