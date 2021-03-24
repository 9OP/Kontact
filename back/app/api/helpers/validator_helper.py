import re
import cerberus
import app.api_responses as apr
from app.models.membership_model import Role


class AppValidator(cerberus.Validator):
    email_regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
    password_regex = "(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*])"

    def _validate_is_email(self, is_email, field, value):
        """{'type': 'boolean'}"""
        if is_email and not re.search(self.email_regex, value):
            self._error(field, "Must be an email")

    def _validate_is_strong(self, is_strong, field, value):
        """{'type': 'boolean'}"""
        if is_strong and not re.search(self.password_regex, value):
            self._error(field, "At least 6 char with min, maj, num, special")

    def _validate_is_role(self, is_role, field, value):
        """{'type': 'boolean'}"""
        if is_role and value not in list(map(int, Role)):
            self._error(field, f"Role must be in {list(map(int, Role))}")

    def _normalize_coerce_lowercase(self, value):
        return value.lower()


def validator(document, schema):
    predicat = AppValidator(schema, purge_unknown=True)

    if not predicat.validate(document):
        raise apr.InvalidParameter(predicat.errors)

    return predicat.normalized(document)
