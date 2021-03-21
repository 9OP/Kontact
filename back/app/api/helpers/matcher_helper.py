from difflib import SequenceMatcher
from functools import cmp_to_key


def similarity(**kwargs):
    attr, val = list(kwargs.items())[0]

    @cmp_to_key
    def wrapper(a, b):
        a, b = getattr(a, attr), getattr(b, attr)
        ratio_a = SequenceMatcher(None, a, val).ratio()
        ratio_b = SequenceMatcher(None, b, val).ratio()
        return ratio_a - ratio_b

    return wrapper
