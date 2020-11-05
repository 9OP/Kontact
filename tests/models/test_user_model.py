import pytest
from app.models import User


user_data = {
    "email": "user@mail.com",
    "name": "user",
    "password": "123abcABC#$%",
}


class UserModelSuite:
    @pytest.fixture(autouse=True)
    def _make_user(self, make_user):
        # self.user = make_user(**user_data)
        self.make_user = make_user
        # you can create users with: self.make_user(**kwargs)

    def test_user_definition(self):
        """
        GIVEN a User model
        WHEN a user is already defined
        THEN check the email and name are defined correctly
        """
        user = self.make_user(**user_data)
        assert user.email == user_data["email"]
        assert user.name == user_data["name"]

    def test_create_user(self):
        """
        GIVEN a User model
        WHEN a create user
        THEN check the email and name are defined correctly
        """
        user = User.create(**user_data)
        assert user.email == user_data["email"]
        assert user.name == user_data["name"]
