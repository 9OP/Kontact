import cerberus
from app.common.errors import *


def validator(document, schema):
    predicat = cerberus.Validator(schema)
    predicat.allow_unknown = True

    if not predicat.validate(document):
        print(predicat._errors)
        raise InvalidParameter()

    # # Key filtering
    # response = {}
    # # print(schema)
    # for key in schema:
    #     response[key] = document.get(key, None)

    # return doc / new doc
    print(schema)
    print(document)
    mask = {}
    return document

    # create mask from schema

    # for k, v in schema.items():
    #     if v["type"] != "dict":
    #         mask[key] = True
    #     else:


def prune_dict(dct, mask):
    result = {}
    for k, v in mask.items():
        if isinstance(v, dict):
            value = prune_dict(dct[k], v)
            if value:  # check that dict is non-empty
                result[k] = value
        elif v:
            result[k] = dct[k]
    return result
