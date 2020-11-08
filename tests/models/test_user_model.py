import pytest
import app.api_responses as api_res
from tests.conftest import User
from tests.factories import user_factory


@pytest.mark.usefixtures("database")
class UserModelSuite:
    @pytest.fixture(autouse=True)
    def _base(self, make_user):
        self.make_user = make_user

    def test_define(self):
        """
        GIVEN a User model
        WHEN a user is already defined
        THEN check the user is defined correctly
        """
        user_data = user_factory()
        user = self.make_user(**user_data)
        assert user.name == user_data["name"]
        assert user.email == user_data["email"]

    def test_repr(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN check repr
        """
        user_data = user_factory()
        user = self.make_user(**user_data)
        assert user.__repr__() == f"<user: {user_data['email']}>"

    def test_check_password(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN check password
        """
        user_data = user_factory()
        user = self.make_user(**user_data)
        assert user.check_password(user_data["password"]) is True
        assert user.check_password("notmypassword") is False

    def test_serialize(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN check serialize user data
        """
        user = self.make_user(**user_factory())
        user_serialized = user.serialize("id", "name", "email")
        assert user_serialized == {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        }

    def test_summary(self):
        """
        GIVEN a User model
        WHEN a user is summarized
        THEN return id, name, email and channels
        """
        user = self.make_user(**user_factory())
        assert user.summary() == {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "channels": [],
        }

    def test_find(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN find user by name and email
        """
        user = self.make_user(**user_factory())
        found = User.find(name=user.name)
        assert found.id == user.id

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
        user_data = user_factory()
        user = User.create(**user_data)
        assert user.email == user_data["email"]
        assert user.name == user_data["name"]

    def test_fail_create_duplicate(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN fail when create an existing user
        """
        user_data = user_factory()
        self.make_user(**user_data)
        with pytest.raises(api_res.AlreadyExists):
            User.create(**user_data)

    def test_update(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN update user name
        """
        user = self.make_user(**user_factory())
        user.update(name="anon")
        assert user.name == "anon"

    def test_fail_update(self):
        """
        GIVEN a User model
        WHEN a user is defined
        THEN fail when update with existing email
        """
        user_data1 = user_factory()
        user_data2 = user_factory()
        user1 = self.make_user(**user_data1)
        user2 = self.make_user(**user_data2)
        with pytest.raises(api_res.AlreadyExists):
            user1.update(email=user2.email)

    def test_destroy(self):
        """
        GIVEN a User model
        WHEN a user is destroyed
        THEN user is not defined
        """
        user_data = user_factory()
        user = self.make_user(**user_data)
        user.destroy()
        assert User.query.filter_by(id=user.id).first() is None

    def test_find_or_fail_not_found(self):
        """
        GIVEN a User model
        WHEN a user is not found
        THEN fail
        """
        user_data = user_factory()
        with pytest.raises(api_res.NotFound):
            User.find_or_fail(email=user_data["email"])

    def test_find_or_fail_found(self):
        """
        GIVEN a User model
        WHEN a user is found
        THEN return user
        """
        user_data = user_factory()
        user = self.make_user(**user_data)
        found = User.find_or_fail(email=user_data["email"])
        assert found == user

    def test_find_or_fail_unkowns_keys(self):
        """
        GIVEN a User model
        WHEN find or fail with unknown keys
        THEN fails
        """
        with pytest.raises(api_res.ApiError):
            User.find_or_fail(blublu="123")

    def test_find_all(self):
        """
        GIVEN a User model and users
        WHEN find_all
        THEN returns all users
        """
        user_data1 = user_factory()
        user_data2 = user_factory()
        user1 = self.make_user(**user_data1)
        user2 = self.make_user(**user_data2)
        assert User.find_all() == [user1, user2]

    def test_find_all_fail(self):
        """
        GIVEN a User model and users
        WHEN find_all with unknown keys
        THEN fails
        """
        with pytest.raises(api_res.ApiError):
            User.find_all(blublu="123")
