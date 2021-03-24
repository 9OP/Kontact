import pytest
from app.models import Role


def test_define(_membership):
    """
    GIVEN a Membership model
    WHEN a membership is fetched
    THEN attrs are correct
    """
    membership, user, channel = _membership
    assert membership.user_id == user.id
    assert membership.channel_id == channel.id
    assert membership.role == Role.MEMBER.value


def test_repr(_membership):
    """
    GIVEN a membership instance
    WHEN repr
    THEN return membership user_id and channel_id
    """
    membership, user, channel = _membership
    assert membership.__repr__() == "<membership: <uid: {}, cid: {}>>".format(
        user.id, channel.id
    )


def test_user_summary(_membership):
    """
    GIVEN a membership instance
    WHEN is summarized with source="user"
    THEN returns summary of user
    """
    membership, user, channel = _membership
    assert membership.summary(source="user") == {
        "id": user.id,
        "name": user.name,
        "role": membership.role,
        "email": user.email,
        "joined_at": membership.created_at,
    }


def test_channel_summary(_membership):
    """
    GIVEN a membership instance
    WHEN is summarized with source="channel"
    THEN returns summary of channel
    """
    membership, user, channel = _membership
    assert membership.summary(source="channel") == {
        "id": channel.id,
        "name": channel.name,
        "role": membership.role,
        "joined_at": membership.created_at,
    }
