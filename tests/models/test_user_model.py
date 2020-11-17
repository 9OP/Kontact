import pytest
import app.api_responses as api_res
from app.models.user_model import Access
from tests.conftest import User
from tests.factories import user_factory


class UserModelSuite:
    @pytest.fixture(autouse=True)
    def setup(self, make_user):
        self.make_user = make_user

    def test_define(self):
        """
        GIVEN a User model
        WHEN a user is fetched
        THEN attrs are correct
        """
        user_data = user_factory()
        user = self.make_user(**user_data)
        assert user.name == user_data["name"]
        assert user.email == user_data["email"]

    def test_repr(self):
        """
        GIVEN a user instance
        WHEN repr
        THEN returns user email
        """
        user_data = user_factory()
        user = self.make_user(**user_data)
        assert user.__repr__() == f"<user: {user_data['email']}>"

    def test_check_password(self):
        """
        GIVEN a user instance
        WHEN check password
        THEN returns True or False
        """
        user_data = user_factory()
        user = self.make_user(**user_data)
        assert user.check_password(user_data["password"]) is True
        assert user.check_password("notmypassword") is False

    def test_summary(self):
        """
        GIVEN a user instance
        WHEN summarized
        THEN returns id, name, email, channels, access
        """
        user = self.make_user(**user_factory())
        assert user.summary() == {
            "id": user.id,
            "access": Access(user.access).name,
            "name": user.name,
            "email": user.email,
            "channels": [],
        }
