#!/bin/bash

# Run latest migrations (create db if doesn't exists)
python manage.py db upgrade

# Exec CMD
exec "$@"
