import pytest
import app.api_responses as api_res
from tests.conftest import User
from tests.factories import user_factory


class SupportSuite:
    @pytest.fixture(autouse=True)
    def setup(self, make_user):
        self.make_user = make_user

    def test_serialize(self):
        """
        GIVEN an instance
        WHEN serialize with attrs
        THEN instance serialized with attrs
        """
        user = self.make_user(**user_factory())
        user_serialized = user.serialize("id", "name", "email")
        assert user_serialized == {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        }

    def test_create(self):
        """
        GIVEN a model
        WHEN create instance
        THEN instance is created
        """
        user_data = user_factory()
        user = User.create(**user_data)
        assert user.email == user_data["email"]
        assert user.name == user_data["name"]

    def test_create_already_exists(self):
        """
        GIVEN a model
        WHEN create duplicate instance
        THEN raise AlreadyExists
        """
        user_data = user_factory()
        self.make_user(**user_data)
        with pytest.raises(api_res.AlreadyExists):
            User.create(**user_data)

    def test_update(self):
        """
        GIVEN an instance
        WHEN update
        THEN instance updated
        """
        user = self.make_user(**user_factory())
        user.update(name="anon")
        assert user.name == "anon"

    def test_update_already_exists(self):
        """
        GIVEN two instances
        WHEN one is updated with existing uniq attribute
        THEN raise AlreadyExists
        """
        user_data1 = user_factory()
        user_data2 = user_factory()
        user1 = self.make_user(**user_data1)
        user2 = self.make_user(**user_data2)
        with pytest.raises(api_res.AlreadyExists):
            user1.update(email=user2.email)

    def test_destroy(self):
        """
        GIVEN an instance
        WHEN destroy
        THEN instance destroyed
        """
        user = self.make_user(**user_factory())
        user.destroy()
        assert User.query.filter_by(id=user.id).first() is None

    def test_find(self):
        """
        GIVEN a model
        WHEN find
        THEN return found
        """
        user = self.make_user(**user_factory())
        found = User.find(name=user.name)
        assert found.id == user.id

    def test_find_fail_api_error(self):
        """
        GIVEN a model
        WHEN query with find and unknown attrs
        THEN raise ApiError
        """
        with pytest.raises(api_res.ApiError):
            User.find(blublu=123)

    def test_find_all(self):
        """
        GIVEN a model
        WHEN find all
        THEN returns all
        """
        user_data1 = user_factory()
        user_data2 = user_factory()
        user1 = self.make_user(**user_data1)
        user2 = self.make_user(**user_data2)
        assert User.find_all() == [user1, user2]

    def test_find_one(self):
        """
        GIVEN a model
        WHEN find one
        THEN find instance
        """
        user = self.make_user(**user_factory())
        found = User.find_one(email=user.email)
        assert found == user

    def test_find_one_not_found(self):
        """
        GIVEN a model
        WHEN find one and not found
        THEN raise NotFound
        """
        with pytest.raises(api_res.NotFound):
            User.find_one(email="notfound")
