# Back

Kontact backend / authentication server

## Commands

Application cli:

- `docker-compose run back python manage.py <command>`

Connect to the Postgres database:

- `docker-compose exec db psql --username=<developer> --dbname=<kontact_dev>`

Backup / restore databases:

- `` docker-compose exec -t db pg_dumpall -c -U postgres > dump_`date + %Y-%m-%d"_"%H:%M:%S`.sql  ``
- `cat your_dump.sql | docker exec -i db psql -U postgres`
