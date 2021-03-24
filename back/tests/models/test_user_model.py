def test_define(_user):
    """
    GIVEN a user instance
    WHEN fetched
    THEN attrs are correct
    """
    user, user_data = _user
    assert user.name == user_data["name"]
    assert user.email == user_data["email"]


def test_repr(_user):
    """
    GIVEN a user instance
    WHEN repr
    THEN returns user email
    """
    user, user_data = _user
    assert user.__repr__() == f"<user: {user_data['email']}>"


def test_check_password(_user):
    """
    GIVEN a user instance
    WHEN check password
    THEN returns True or False
    """
    user, user_data = _user
    assert user.check_password(user_data["password"]) is True
    assert user.check_password(user_data["password"] + "*") is False


def test_summary(_user):
    """
    GIVEN a user instance
    WHEN summarized
    THEN returns id, name, email, channels, access
    """
    user, _ = _user
    assert user.summary() == {
        "id": user.id,
        "access": user.access,
        "name": user.name,
        "email": user.email,
        "channels_count": 0,
    }
