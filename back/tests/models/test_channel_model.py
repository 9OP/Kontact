import pytest
from sqlalchemy.exc import IntegrityError


def test_define(_channel):
    """
    GIVEN a Channel model
    WHEN a Channel is fetched
    THEN attrs are correct
    """
    channel, channel_data = _channel
    assert channel.name == channel_data["name"]


def test_repr(_channel):
    """
    GIVEN a channel instance
    WHEN repr
    THEN returns channel name
    """
    channel, channel_data = _channel
    assert channel.__repr__() == f"<channel: {channel_data['name']}>"


def test_summary_verbose(_membership):
    """
    GIVEN a channel instance
    WHEN is summarized with verbose True
    THEN returns id, name, created_at, members_count and members
    """
    membership, user, channel = _membership
    assert channel.summary(verbose=True) == {
        "id": channel.id,
        "name": channel.name,
        "created_at": channel.created_at,
        "members_count": channel.members_count,
        "members": [
            {
                "id": user.id,
                "email": user.email,
                "role": membership.role,
                "name": user.name,
                "joined_at": membership.created_at,
            }
        ],
    }


def test_summary(_channel):
    """
    GIVEN a channel instance
    WHEN is summarized with verbose False
    THEN returns id, name, created_at and members_count
    """
    channel, _ = _channel
    assert channel.summary(verbose=False) == {
        "id": channel.id,
        "name": channel.name,
        "created_at": channel.created_at,
        "members_count": channel.members_count,
    }


def test_members_count(_user, _channel, make_membership):
    """
    GIVEN a channel instance
    WHEN add new members
    THEN members_count increment
    """
    user, _ = _user
    channel, _ = _channel
    assert channel.members_count == 0
    make_membership(user_id=user.id, channel_id=channel.id)
    assert channel.members_count == 1


def test_channel_uniqueness(_channel, make_channel):
    """
    GIVEN a channel instance
    WHEN creating a new channel with existing name
    THEN raise IntegrityError
    """
    _, channel_data = _channel
    with pytest.raises(IntegrityError):
        make_channel(**channel_data)
