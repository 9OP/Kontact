#!/bin/sh

# Run latest migrations (create db if doesn't exists)
# This should be an entrypoint in order to always run, but CMD is good enough
python manage.py db upgrade

gunicorn -c 'python:config.gunicorn' 'app:create_app()'
