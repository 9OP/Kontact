import pytest
from app.models.user_model import Access
from tests.routes.requests_helper import RequestsHelper
from tests.factories import user_factory


@pytest.mark.usefixtures("cleandb")
class UserRequestsSuite(RequestsHelper):
    @pytest.fixture()
    def _guest(self, make_user):
        self.guest = make_user(**user_factory(), access=Access.GUEST.value)

    @pytest.fixture()
    def _user(self, make_user):
        self.user = make_user(**user_factory())  # access=Access.User.value

    @pytest.fixture()
    def _admin(self, make_user):
        self.admin = make_user(**user_factory(), access=Access.ADMIN.value)

    def test_access_fail(self, _guest):
        """
        GIVEN a user instance
        WHEN GET /user/<user_id> as guest
        THEN returns 403
        """
        self.login(self.guest.id)
        response = self.get(f"/user/{self.guest.id}")
        RequestsHelper.expect_failure(response, code=403)

    def test_show(self, _user, _admin):
        """
        GIVEN a user instance
        WHEN GET /user/<user_id> as admin
        THEN returns user summary
        """
        self.login(self.admin.id)
        response = self.get(f"/user/{self.user.id}")
        RequestsHelper.expect_success(response, self.user.summary())

    def test_index(self, _guest, _user, _admin):
        """
        GIVEN user instances
        WHEN GET /user as admin
        THEN returns all users short summary
        """
        self.login(self.admin.id)
        response = self.get("/user")
        RequestsHelper.expect_success(
            response,
            [
                self.guest.short(),
                self.user.short(),
                self.admin.short(),
            ],
        )
