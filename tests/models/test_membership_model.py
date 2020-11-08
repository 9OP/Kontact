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

    def test_repr(self):
        """
        GIVEN a Membership model
        WHEN a membership is defined
        THEN check repr
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        membership = self.make_membership(user_id=user.id, channel_id=channel.id)
        assert membership.__repr__() == "<membership: <uid: {}, cid: {}>>".format(
            user.id, channel.id
        )

    def test_user_summary(self):
        """
        GIVEN a Membership model
        WHEN a membership user_summary
        THEN returns summary of user
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        membership = self.make_membership(user_id=user.id, channel_id=channel.id)
        assert membership.user_summary() == {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "joined_at": membership.created_at,
        }

    def test_channel_summary(self):
        """
        GIVEN a Membership model
        WHEN a membership channel_summary
        THEN returns summary of channel
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        membership = self.make_membership(user_id=user.id, channel_id=channel.id)
        assert membership.channel_summary() == {
            "id": channel.id,
            "name": channel.name,
            "joined_at": membership.created_at,
        }
