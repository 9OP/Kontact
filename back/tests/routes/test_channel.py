import pytest
import uuid
import app.api_responses as apr
from app.models import Access, Role, Channel, Membership
from tests.routes.requests_helper import (
    expect_failure,
    expect_success,
    payload,
    mock_token,
    loggin_user,
)


class TestChannelNew:
    def test_new(self, client, loggin_user):  # noqa: F811
        """
        GIVEN a signed in user
        WHEN POST /channel
        THEN returns channel
        """
        user, token, _ = loggin_user
        channel_data = {"name": "SuperChannel"}

        response = client.post("/channel", **payload(channel_data, token=token))
        channel = Channel.find(name=channel_data["name"])
        membership = Membership.find(user_id=user.id, channel_id=channel.id)

        expect_success(response, channel.summary(), code=201)
        assert membership.role == Role.MASTER

    @pytest.mark.parametrize(
        "case, channel_data",
        {
            "no_params": {},
            "none_name": {"name": None},
            "empty_name": {"name": ""},
            "blank_name": {"name": "  "},
        }.items(),
    )
    def test_fail_invalid_parameter(
        self, client, loggin_user, case, channel_data  # noqa: F811
    ):
        """
        GIVEN a signed user
        WHEN POST /channel with invalid
        THEN returns 411, 400
        """
        user, token, _ = loggin_user

        response = client.post("/channel", **payload(channel_data, token=token))
        expect_failure(response, {"app_code": 411}, code=400)

    def test_fail_already_exists(self, client, loggin_user):  # noqa: F811
        """
        GIVEN a signed user
        WHEN POST /channel with existing name
        THEN returns 410, 400
        """
        user, token, _ = loggin_user
        channel_data = {"name": "SuperChannel"}

        client.post("/channel", **payload(channel_data, token=token))
        response = client.post("/channel", **payload(channel_data, token=token))

        expect_failure(response, {"app_code": 410}, code=400)


class TestChannelIndex:
    def test_index(self, client, loggin_user, make_channel):  # noqa: F811
        """
        GIVEN a signed in admin
        WHEN GET /channel
        THEN returns channels
        """
        user, token, _ = loggin_user
        user.update(access=Access.ADMIN)
        channel_1 = make_channel(name="channel_1")
        channel_2 = make_channel(name="channel_2")
        channel_3 = make_channel(name="channel_3")

        response = client.get("/channel", **payload(token=token))
        expect_success(
            response,
            [channel_1.summary(), channel_2.summary(), channel_3.summary()],
            code=200,
        )

    def test_fail_access(self, client, loggin_user):  # noqa: F811
        """
        GIVEN a signed in user
        WHEN GET /channel
        THEN returns 403
        """
        user, token, _ = loggin_user

        response = client.get("/channel", **payload(token=token))
        expect_failure(response, {"app_code": 403}, code=403)


class TestChannelShow:
    def test_show(self, client, loggin_user, make_channel):  # noqa: F811
        """
        GIVEN a signed in admin
        WHEN GET /channel/<channel_id>
        THEN returns channel
        """
        user, token, _ = loggin_user
        user.update(access=Access.ADMIN)
        channel = make_channel(name="SuperChannel")

        response = client.get(f"/channel/{channel.id}", **payload(token=token))
        expect_success(response, channel.summary(verbose=True), code=200)

    def test_show_access(
        self, client, loggin_user, make_channel, make_membership  # noqa: F811
    ):
        """
        GIVEN a signed in member
        WHEN GET /channel/<channel_id>
        THEN returns channel
        """
        user, token, _ = loggin_user
        user.update(access=Access.ADMIN)
        channel = make_channel(name="SuperChannel")
        make_membership(user_id=user.id, channel_id=channel.id)

        response = client.get(f"/channel/{channel.id}", **payload(token=token))
        expect_success(response, channel.summary(verbose=True), code=200)

    def test_fail_access(self, client, loggin_user, make_channel):  # noqa: F811
        """
        GIVEN a signed in user, not member,
        WHEN GET /channel/<channel_id>
        THEN returns 403
        """
        user, token, _ = loggin_user
        channel = make_channel(name="SuperChannel")

        response = client.get(f"/channel/{channel.id}", **payload(token=token))
        expect_failure(response, {"app_code": 403}, code=403)


class TestChannelDestroy:
    def test_destroy(self, client, loggin_user, make_channel):  # noqa: F811
        """
        GIVEN a signed in admin
        WHEN DELETE /channel/<channel_id>
        THEN delete channel
        """
        user, token, _ = loggin_user
        user.update(access=Access.ADMIN)
        channel = make_channel(name="SuperChannel")

        response = client.delete(f"/channel/{channel.id}", **payload(token=token))
        expect_success(
            response,
            {"app_code": 200, "description": f"Channel <{channel.id}> deleted."},
            code=200,
        )
        assert Channel.find(id=channel.id) is None

    def test_fail_access(self, client, loggin_user, make_channel):  # noqa: F811
        """
        GIVEN a signed user, not admin
        WHEN DELETE /channel/<channel_id>
        THEN raise 403
        """
        user, token, _ = loggin_user
        channel = make_channel(name="SuperChannel")

        response = client.delete(f"/channel/{channel.id}", **payload(token=token))
        expect_failure(response, {"app_code": 403}, code=403)

    def test_destroy_idempotent(self, client, loggin_user):  # noqa: F811
        """
        GIVEN a signed in admin
        WHEN DELETE /channel/<delete_channel_id>
        THEN ok
        """
        user, token, _ = loggin_user
        user.update(access=Access.ADMIN)
        cid = str(uuid.uuid4())

        response = client.delete(f"/channel/{cid}", **payload(token=token))
        expect_success(
            response,
            {"app_code": 200, "description": f"Channel <{cid}> deleted."},
            code=200,
        )

    def test_fail_access_member(
        self, client, loggin_user, make_channel, make_membership  # noqa: F811
    ):
        """
        GIVEN a signed member, not master
        WHEN DELETE /channel/<channel_id>
        THEN raise 403
        """
        user, token, _ = loggin_user
        channel = make_channel(name="SuperChannel")
        make_membership(user_id=user.id, channel_id=channel.id)

        response = client.delete(f"/channel/{channel.id}", **payload(token=token))
        expect_failure(response, {"app_code": 403}, code=403)

    def test_access_master(
        self, client, loggin_user, make_channel, make_membership  # noqa: F811
    ):
        """
        GIVEN a signed member, not master
        WHEN DELETE /channel/<channel_id>
        THEN raise 403
        """
        user, token, _ = loggin_user
        channel = make_channel(name="SuperChannel")
        make_membership(user_id=user.id, channel_id=channel.id, role=Role.MASTER)

        response = client.delete(f"/channel/{channel.id}", **payload(token=token))
        expect_success(
            response,
            {"app_code": 200, "description": f"Channel <{channel.id}> deleted."},
            code=200,
        )


class TestChannelMemberships:
    def test_memberships(self):
        pass


class TestChannelUpdate:
    def test_update(self):
        pass

    def test_fail_access(self):
        pass


class TestChannelAddMember:
    def test_add_member(self):
        pass

    def test_fail_access(self):
        pass


class TestChannelDeleteMember:
    def test_delete_member(self):
        pass

    def test_fail_access(self):
        pass

    def test_idempotent(self):
        pass


class TestChannelUpdateMember:
    def test_update_member(self):
        pass

    def test_fail_access(self):
        pass
