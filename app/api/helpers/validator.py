import cerberus
from app.common.errors import *


def validator(document, schema):
    v = cerberus.Validator(schema)
    v.allow_unknown = True
    valid = v.validate(document)
    if not valid:
        print(v._errors)
        raise InvalidParameter()
    else:
        return document
