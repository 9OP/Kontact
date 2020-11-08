import pytest
import app.api_responses as api_res
from tests.conftest import Channel, Membership
from tests.factories import channel_factory, user_factory


@pytest.mark.usefixtures("database")
class ChannelModelSuite:
    @pytest.fixture(autouse=True)
    def _base(self, make_channel, make_user, make_membership):
        self.make_channel = make_channel
        self.make_user = make_user
        self.make_membership = make_membership

    def test_define(self):
        """
        GIVEN a Channel model
        WHEN a channel is already defined
        THEN check the channel is defined correctly
        """
        channel_data = channel_factory()
        channel = self.make_channel(**channel_data)
        assert channel.name == channel_data["name"]

    def test_repr(self):
        """
        GIVEN a Channel model
        WHEN a channel is defined
        THEN check repr
        """
        channel_data = channel_factory()
        channel = self.make_channel(**channel_data)
        assert channel.__repr__() == f"<channel: {channel_data['name']}>"

    def test_summary(self):
        """
        GIVEN a Channel model
        WHEN a channel is summarized
        THEN return id, name, created_at and members
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        membership = self.make_membership(user_id=user.id, channel_id=channel.id)
        assert channel.summary() == {
            "id": channel.id,
            "name": channel.name,
            "created_at": channel.created_at,
            "members": [
                {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "joined_at": membership.created_at,
                }
            ],
        }

    def test_count_members(self):
        """
        GIVEN a Channel model
        WHEN a new member is added
        THEN count_members increment
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        assert channel.members_count == 0
        self.make_membership(user_id=user.id, channel_id=channel.id)
        assert channel.members_count == 1
