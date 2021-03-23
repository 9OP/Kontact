# import pytest
# from flask import json
# from app.models.user_model import Access
# from app.models.membership_model import Role
# from tests.routes.requests_helper import RequestsHelper
# from tests.factories import channel_factory, user_factory
# from tests.conftest import Channel


# @pytest.mark.usefixtures("cleandb")
# class ChannelRequestsSuite(RequestsHelper):
#     @pytest.fixture()
#     def _guest(self, make_user):
#         self.guest = make_user(**user_factory(), access=Access.GUEST.value)

#     @pytest.fixture()
#     def _user(self, make_user):
#         self.user = make_user(**user_factory())  # access=Access.User.value

#     @pytest.fixture()
#     def _admin(self, make_user):
#         self.admin = make_user(**user_factory(), access=Access.ADMIN.value)

#     @pytest.fixture()
#     def _channel(self, make_channel):
#         self.channel = make_channel(**channel_factory())

#     @pytest.fixture()
#     def _member(self, _channel, make_user, make_membership):
#         self.member = make_user(**user_factory())
#         make_membership(user_id=self.member.id, channel_id=self.channel.id)

#     @pytest.fixture()
#     def _master(self, _channel, make_user, make_membership):
#         self.master = make_user(**user_factory())
#         make_membership(
#             user_id=self.master.id, channel_id=self.channel.id, role=Role.MASTER.value
#         )

#     def test_new(self, _user):
#         """
#         GIVEN a channel input
#         WHEN POST /channel as user
#         THEN returns channel + 201
#         """
#         self.login(self.user.id)
#         channel = channel_factory()
#         response = self.post("/channel", channel)
#         RequestsHelper.expect_success(
#             response,
#             Channel.find(name=channel["name"]).summary(),
#             code=201,
#         )

#     def test_index(self, _user, _channel, make_channel):
#         """
#         GIVEN multiple channel instances
#         WHEN GET /channel as user
#         THEN returns all channel
#         """
#         self.login(self.user.id)
#         chan = make_channel(**channel_factory())
#         response = self.get("/channel")
#         RequestsHelper.expect_success(
#             response,
#             [
#                 self.channel.short(),
#                 chan.short(),
#             ],
#         )

#     def test_show(self, _member):
#         """
#         GIVEN a channel instance
#         WHEN GET /channel/<channel_id> as member
#         THEN returns channel summary
#         """
#         self.login(self.member.id)
#         response = self.get(f"/channel/{self.channel.id}")
#         RequestsHelper.expect_success(response, self.channel.summary())

#     def test_destroy(self, _master):
#         """
#         GIVEN a channel instance
#         WHEN DELETE /channel/<channel_id> as master
#         THEN delete channel
#         """
#         self.login(self.master.id)
#         response = self.delete(f"/channel/{self.channel.id}")
#         RequestsHelper.expect_success(response)

#     def test_add_member(self, _master, _user):
#         """
#         GIVEN a channel instance
#         WHEN POST /channel/<cid>/membership/<uid> as master
#         THEN add member
#         """
#         self.login(self.master.id)
#         response = self.post(f"/channel/{self.channel.id}/membership/{self.user.id}")
#         RequestsHelper.expect_success(response, code=201)

#     def test_add_member_fail_already_member(self, _master, _member):
#         """
#         GIVEN a channel instance and uid already in cid
#         WHEN POST /channel/<cid>/membership/<uid> as master
#         THEN expect failure
#         """
#         self.login(self.master.id)
#         response = self.post(f"/channel/{self.channel.id}/membership/{self.member.id}")
#         RequestsHelper.expect_failure(response)

#     def test_del_member(self, _master, _member):
#         """
#         GIVEN a channel instance and uid already in cid
#         WHEN POST /channel/<cid>/membership/<uid> as master
#         THEN expect failure
#         """
#         self.login(self.master.id)
#         assert self.member.channels[0].id == self.channel.id
#         response = self.delete(
#             f"/channel/{self.channel.id}/membership/{self.member.id}"
#         )
#         RequestsHelper.expect_success(response)
#         assert self.member.channels == []

#     # TEST AUTHORIZATIONS

#     def test_fail_not_user(self, _guest):
#         """
#         GIVEN a channel instance and guest
#         WHEN call user access required route
#         THEN expect failure
#         """
#         self.login(self.guest.id)
#         response = self.get("/channel")
#         RequestsHelper.expect_failure(response, code=403)

#     def test_fail_not_member(self, _user, _channel):
#         """
#         GIVEN a channel instance and not member
#         WHEN call member role required route
#         THEN expect failure
#         """
#         self.login(self.user.id)
#         response = self.get(f"/channel/{self.channel.id}")
#         RequestsHelper.expect_failure(response, code=403)

#     def test_fail_not_master(self, _member):
#         """
#         GIVEN a channel instance and not master
#         WHEN call master role required route
#         THEN expect failure
#         """
#         self.login(self.member.id)
#         response = self.delete(f"/channel/{self.channel.id}")
#         RequestsHelper.expect_failure(response, code=403)

#     def test_admin_is_master(self, _admin, _channel):
#         """
#         GIVEN a channel instance and admin
#         WHEN call master role required route
#         THEN expect success
#         """
#         self.login(self.admin.id)
#         response = self.delete(f"/channel/{self.channel.id}")
#         RequestsHelper.expect_success(response)
