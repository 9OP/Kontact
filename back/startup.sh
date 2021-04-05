#!/bin/sh

gunicorn -c 'python:config.gunicorn' 'app:create_app()'
