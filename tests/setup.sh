#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE kontact_test;
    CREATE USER tester WITH PASSWORD 'secret';
    ALTER DATABASE kontact_test OWNER TO tester;
    GRANT ALL PRIVILEGES ON DATABASE kontact_test TO tester;
EOSQL
