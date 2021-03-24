import pytest
from app.models import User
import app.api_responses as api_res


def test_serialize_attributes(_user):
    """
    GIVEN an instance
    WHEN serialize with attrs
    THEN instance serialized with attrs
    """
    user, _ = _user
    user_serialized = user.serialize("id", "name", "email")
    assert user_serialized == {
        "id": user.id,
        "name": user.name,
        "email": user.email,
    }


def test_serialize_hybrid(_channel):
    """
    GIVEN an instance
    WHEN serialize with hybrid attrs
    THEN instance serialized with hybrid attrs
    """
    channel, _ = _channel
    channel_seralized = channel.serialize("members_count")
    assert channel_seralized == {"members_count": channel.members_count}


def test_serialize_with_key(_membership):
    """
    GIVEN an instance
    WHEN serialize with key attrs
    THEN instance serialized with key attrs
    """
    membership, _, _ = _membership
    membership_serialized = membership.serialize(created_at="joined_at")
    assert membership_serialized == {"joined_at": membership.created_at}


def test_create(_user):
    """
    GIVEN a model
    WHEN create instance
    THEN instance is created
    """
    user, user_data = _user
    assert user.email == user_data["email"]
    assert user.name == user_data["name"]


def test_create_already_exists(_user, make_user):
    """
    GIVEN a model
    WHEN create duplicate instance
    THEN raise AlreadyExists
    """
    _, user_data = _user
    with pytest.raises(api_res.AlreadyExists):
        User.create(**user_data)


def test_update(_user):
    """
    GIVEN an instance
    WHEN update
    THEN instance updated
    """
    user, _ = _user
    user.update(name="bob")
    assert user.name == "bob"


def test_update_already_exists(make_user):
    """
    GIVEN two instances
    WHEN one is updated with existing uniq attribute
    THEN raise AlreadyExists
    """
    bob = make_user(name="bob", email="bob@domain.com", password="*")
    alice = make_user(name="alice", email="alice@domain.com", password="*")
    with pytest.raises(api_res.AlreadyExists):
        bob.update(email=alice.email)


def test_destroy(_user):
    """
    GIVEN an instance
    WHEN destroy
    THEN destroy instance
    """
    user, _ = _user
    user.destroy()
    assert User.query.filter_by(id=user.id).first() is None


def test_find(_user):
    """
    GIVEN a model
    WHEN find first
    THEN return found
    """
    user, _ = _user
    found = User.find(name=user.name)
    assert found.id == user.id


def test_find_fail_api_error():
    """
    GIVEN a model
    WHEN query with find and unknown attrs
    THEN raise ApiError
    """
    with pytest.raises(api_res.ApiError):
        User.find(blublu=123)


def test_find_all(make_user):
    """
    GIVEN a model
    WHEN find all
    THEN returns all
    """
    bob = make_user(name="bob", email="bob@domain.com", password="*")
    alice = make_user(name="alice", email="alice@domain.com", password="*")
    eve = make_user(name="eve", email="eve@domain.com", password="*")
    found_all = [u.id for u in User.find_all()]
    assert len(found_all) == 3
    assert bob.id in found_all
    assert alice.id in found_all
    assert eve.id in found_all


def test_find_one(_user):
    """
    GIVEN a model
    WHEN find one
    THEN find instance
    """
    user, _ = _user
    found = User.find_one(email=user.email)
    assert found.id == user.id


def test_find_one_fail_not_found():
    """
    GIVEN a model
    WHEN find one and not found
    THEN raise NotFound
    """
    with pytest.raises(api_res.NotFound):
        User.find_one(email="notfound")


def test_search(make_user):
    """
    GIVEN a model
    WHEN search over attrs
    THEN return matched record
    """
    _ = make_user(name="bob", email="bob@domain.com", password="*")
    alice = make_user(name="alice", email="alice@domain.com", password="*")
    found = User.search(name="li")
    assert len(found) == 1
    assert found[0].id == alice.id
