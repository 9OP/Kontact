from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt


# It works because it is imported under app context
CONFIG = current_app.config
db = SQLAlchemy()
bcrypt = Bcrypt()
