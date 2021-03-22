from flask import request, g, session
from app.models import User, UserToken
import app.api_responses as apr


def authentication(delegation=False):
    bearer = request.headers.get("Authorization", "").strip().split()
    if not bearer:
        raise apr.AuthError(description="Authentication token required.")

    uid, tid = UserToken.decode(bearer[-1])

    if not delegation and session.get("user_id") != uid:
        raise apr.AuthError(description="Session id invalid.")

    g.current_user = User.find_one(id=uid)
    g.auth_token = UserToken.find_one(id=tid)
