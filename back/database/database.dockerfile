FROM postgres:12-alpine
# COPY ./tests/init.sql /docker-entrypoint-initdb.d/
COPY ./setup.sh /docker-entrypoint-initdb.d/