from flask import jsonify


def api_render(res=None):
    if isinstance(res, dict):
        return jsonify(res)
    return jsonify({"code": 200, "description": res or "success"})
