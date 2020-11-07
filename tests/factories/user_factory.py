from faker import Faker

faker = Faker()


def user_factory():
    return {
        "email": faker.email(),
        "name": faker.name(),
        "password": "ABCabc123!@#",
    }
