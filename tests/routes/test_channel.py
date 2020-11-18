import pytest
from flask import json
from app.models.user_model import Access
from app.models.membership_model import Role
from tests.routes.requests_helper import RequestsHelper
from tests.factories import channel_factory, user_factory
from tests.conftest import Channel


class ChannelRequestsSuite(RequestsHelper):
    @pytest.fixture(autouse=True)
    def setup(self, make_user, make_channel, make_membership):
        self.channel = make_channel(**channel_factory())
        self.guest = make_user(**user_factory(), access=Access.GUEST.value)
        self.user = make_user(**user_factory())  # User by default
        self.admin = make_user(**user_factory(), access=Access.ADMIN.value)
        self.member = make_user(**user_factory())
        self.master = make_user(**user_factory())
        make_membership(user_id=self.member.id, channel_id=self.channel.id)
        make_membership(
            user_id=self.master.id, channel_id=self.channel.id, role=Role.MASTER.value
        )

        self.make_channel = make_channel
        self.to_resp = lambda x: json.loads(json.dumps(x))

    def test_new(self):
        """
        GIVEN a channel input
        WHEN POST /channel as user
        THEN returns channel + 201
        """
        self.login(self.user.id)
        channel = channel_factory()
        response = self.post("/channel", channel)
        RequestsHelper.expect_success(
            response,
            self.to_resp(Channel.find(name=channel["name"]).summary()),
            code=201,
        )

    def test_index(self):
        """
        GIVEN multiple channel instances
        WHEN GET /channel as user
        THEN returns all channel
        """
        self.login(self.user.id)
        chan = self.make_channel(**channel_factory())
        response = self.get("/channel")
        RequestsHelper.expect_success(
            response,
            [
                self.to_resp(self.channel.short()),
                self.to_resp(chan.short()),
            ],
        )

    def test_show(self):
        """
        GIVEN a channel instance
        WHEN GET /channel/<channel_id> as member
        THEN returns channel summary
        """
        self.login(self.member.id)
        response = self.get(f"/channel/{self.channel.id}")
        RequestsHelper.expect_success(response, self.to_resp(self.channel.summary()))

    def test_destroy(self):
        """
        GIVEN a channel instance
        WHEN DELETE /channel/<channel_id> as master
        THEN delete channel
        """
        self.login(self.master.id)
        response = self.delete(f"/channel/{self.channel.id}")
        RequestsHelper.expect_success(response)

    def test_add_member(self):
        """
        GIVEN a channel instance
        WHEN POST /channel/<cid>/membership/<uid> as master
        THEN add member
        """
        self.login(self.master.id)
        response = self.post(f"/channel/{self.channel.id}/membership/{self.user.id}")
        RequestsHelper.expect_success(response, code=201)

    def test_add_member_fail_already_member(self):
        """
        GIVEN a channel instance and uid already in cid
        WHEN POST /channel/<cid>/membership/<uid> as master
        THEN expect failure
        """
        self.login(self.master.id)
        response = self.post(f"/channel/{self.channel.id}/membership/{self.member.id}")
        RequestsHelper.expect_failure(response)

    def test_del_member(self):
        """
        GIVEN a channel instance and uid already in cid
        WHEN POST /channel/<cid>/membership/<uid> as master
        THEN expect failure
        """
        self.login(self.master.id)
        assert self.member.channels[0].id == self.channel.id
        response = self.delete(
            f"/channel/{self.channel.id}/membership/{self.member.id}"
        )
        RequestsHelper.expect_success(response)
        assert self.member.channels == []

    # TEST AUTHORIZATIONS

    def test_fail_not_user(self):
        """
        GIVEN a channel instance and guest
        WHEN call user access required route
        THEN expect failure
        """
        self.login(self.guest.id)
        response = self.get("/channel")
        RequestsHelper.expect_failure(response, code=403)

    def test_fail_not_member(self):
        """
        GIVEN a channel instance and not member
        WHEN call member role required route
        THEN expect failure
        """
        self.login(self.user.id)
        response = self.get(f"/channel/{self.channel.id}")
        RequestsHelper.expect_failure(response, code=403)

    def test_fail_not_master(self):
        """
        GIVEN a channel instance and not master
        WHEN call master role required route
        THEN expect failure
        """
        self.login(self.member.id)
        response = self.delete(f"/channel/{self.channel.id}")
        RequestsHelper.expect_failure(response, code=403)

    def test_admin_is_master(self):
        """
        GIVEN a channel instance and admin
        WHEN call master role required route
        THEN expect success
        """
        self.login(self.admin.id)
        response = self.delete(f"/channel/{self.channel.id}")
        RequestsHelper.expect_success(response)
