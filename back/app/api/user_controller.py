from app.models import User
from app.models.user_model import Access
from app.api.middlewares import authentication, access_required
from app.api.helpers import render


@authentication
@access_required(Access.ADMIN)
def index():
    users = User.find_all()
    return render([u.short() for u in users])


@authentication
@access_required(Access.ADMIN)
def show(uid):
    user = User.find_one(id=uid)
    return render(user.summary())
