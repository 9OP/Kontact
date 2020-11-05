import pytest
from app.models import User
import app.common.api_response as api_res


user_data = {
    "email": "user@mail.com",
    "name": "user",
    "password": "123abcABC#$%",
}


@pytest.mark.usefixtures("database")
class UserModelSuite:
    @pytest.fixture(autouse=True)
    def _base(self, make_user):
        self.user = make_user(
            email="kontact@mail.com",
            name="kontact",
            password="123abcABC#$%",
        )
        self.make_user = make_user

    def test_define(self):
        """
        GIVEN a User model
        WHEN a user is already defined
        THEN check the email and name are defined correctly
        """
        assert self.user.email == "kontact@mail.com"
        assert self.user.name == "kontact"

    def test_create(self):
        """
        GIVEN a User model
        WHEN a create user
        THEN check the email and name are defined correctly
        """
        user = User.create(**user_data)
        assert user.email == user_data["email"]
        assert user.name == user_data["name"]

    def test_repr(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN check repr
        """
        assert self.user.__repr__() == f"<user: {self.user.email}>"

    def test_check_password(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN check password
        """
        assert self.user.check_password("123abcABC#$%") is True
        assert self.user.check_password("123abcABC#$") is False

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
        found = User.find(name="kontact")
        assert found.id == self.user.id

    def test_update(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN update user name
        """
        self.user.update(name="anon")
        assert self.user.name == "anon"

    def test_fail_create(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN fail when create an existing user
        """
        with pytest.raises(api_res.ResourceAlreadyExists):
            User.create(
                email="kontact@mail.com",
                name="kontact",
                password="123abcABC#$%",
            )

    def test_fail_update(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN fail when update with existing email
        """
        self.make_user(**user_data)
        with pytest.raises(api_res.ResourceAlreadyExists):
            self.user.update(email="user@mail.com")
