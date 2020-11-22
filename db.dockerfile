FROM postgres:12-alpine
# COPY ./tests/init.sql /docker-entrypoint-initdb.d/
COPY ./tests/setup.sh /docker-entrypoint-initdb.d/
