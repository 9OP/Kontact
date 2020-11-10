import pytest
import app.api_responses as api_res
from app.models.membership_model import Role
from tests.conftest import Channel, Membership
from tests.factories import channel_factory, user_factory


@pytest.mark.usefixtures("database")
class ChannelModelSuite:
    @pytest.fixture(autouse=True)
    def _base(self, make_channel, make_user, make_membership):
        self.make_user = make_user
        self.make_channel = make_channel
        self.make_membership = make_membership

    def test_define(self):
        """
        GIVEN a Channel model
        WHEN a Channel is fetched
        THEN attrs are correct
        """
        channel_data = channel_factory()
        channel = self.make_channel(**channel_data)
        assert channel.name == channel_data["name"]

    def test_repr(self):
        """
        GIVEN a channel instance
        WHEN repr
        THEN returns channel name
        """
        channel_data = channel_factory()
        channel = self.make_channel(**channel_data)
        assert channel.__repr__() == f"<channel: {channel_data['name']}>"

    def test_summary(self):
        """
        GIVEN a channel instance
        WHEN is summarized
        THEN returns id, name, created_at and members
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
                    "role": Role(membership.role).name,
                    "name": user.name,
                    "joined_at": membership.created_at,
                }
            ],
        }

    def test_members_count(self):
        """
        GIVEN a channel instance
        WHEN add new members
        THEN members_count increment
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        assert channel.members_count == 0
        self.make_membership(user_id=user.id, channel_id=channel.id)
        assert channel.members_count == 1
