import pytest
import app.api_responses as api_res
from app.models.membership_model import Role
from tests.conftest import Channel, Membership
from tests.factories import channel_factory, user_factory


@pytest.mark.usefixtures("cleandb")
class MembershipModelSuite:
    @pytest.fixture(autouse=True)
    def setup(self, make_channel, make_user, make_membership):
        self.make_user = make_user
        self.make_channel = make_channel
        self.make_membership = make_membership

    def test_define(self):
        """
        GIVEN a Membership model
        WHEN a membership is fetched
        THEN attrs are correct
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        membership = self.make_membership(user_id=user.id, channel_id=channel.id)
        assert membership.user_id == user.id
        assert membership.channel_id == channel.id
        assert membership.role == Role.MEMBER.value

    def test_repr(self):
        """
        GIVEN a membership instance
        WHEN repr
        THEN return membership user_id and channel_id
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        membership = self.make_membership(user_id=user.id, channel_id=channel.id)
        assert membership.__repr__() == "<membership: <uid: {}, cid: {}>>".format(
            user.id, channel.id
        )

    def test_user_summary(self):
        """
        GIVEN a membership instance
        WHEN user_summary
        THEN returns summary of user
        """
        user = self.make_user(**user_factory())
        channel = self.make_channel(**channel_factory())
        membership = self.make_membership(user_id=user.id, channel_id=channel.id)
        assert membership.user_summary() == {
            "id": user.id,
            "name": user.name,
            "role": Role(membership.role).name,
            "email": user.email,
            "joined_at": membership.created_at,
        }

    def test_channel_summary(self):
        """
        GIVEN a membership instance
        WHEN channel_summary
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
