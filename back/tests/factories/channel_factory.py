from faker import Faker

faker = Faker()


def channel_factory():
    return {"name": faker.company()}
