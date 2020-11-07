import pytest
import app.common.api_response as api_res
from tests.conftest import User, db
from tests.factories import user_factory


@pytest.mark.usefixtures("database")
class UserModelSuite:
    @pytest.fixture(autouse=True)
    def _base(self, make_user):
        self.make_user = make_user
        self.user_data = user_factory()
        self.user = make_user(**self.user_data)

    def test_define(self):
        """
        GIVEN a User model
        WHEN a user is already defined
        THEN check the user is defined correctly
        """
        assert self.user.name == self.user_data["name"]
        assert self.user.email == self.user_data["email"]

    def test_repr(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN check repr
        """
        assert self.user.__repr__() == f"<user: {self.user_data['email']}>"

    def test_check_password(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN check password
        """
        assert self.user.check_password(self.user_data["password"]) is True
        assert self.user.check_password("notmypassword") is False

    def test_serialize(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN check serialize user data
        """
        user_serialized = self.user.serialize("id", "name", "email")
        assert self.user.id == user_serialized["id"]
        assert self.user.name == user_serialized["name"]
        assert self.user.email == user_serialized["email"]

    def test_find(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN find user by name and email
        """
        found = User.find(name=self.user_data["name"])
        assert found.id == self.user.id

    def test_fail_find(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN find user by unkown keys
        """
        with pytest.raises(api_res.ApiError):
            User.find(blublu=123)

    def test_create(self):
        """
        GIVEN a User model
        WHEN a create user
        THEN check the email and name are defined correctly
        """
        other_user = user_factory()
        user = User.create(**other_user)
        assert user.email == other_user["email"]
        assert user.name == other_user["name"]

    def test_fail_create_duplicate(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN fail when create an existing user
        """
        with pytest.raises(api_res.ResourceAlreadyExists):
            User.create(**self.user_data)

    def test_update(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN update user name
        """
        self.user.update(name="anon")
        assert self.user.name == "anon"

    def test_fail_update(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN fail when update with existing email
        """
        other_user = user_factory()
        self.make_user(**other_user)
        with pytest.raises(api_res.ResourceAlreadyExists):
            self.user.update(email=other_user["email"])
