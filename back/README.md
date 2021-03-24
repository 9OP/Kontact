# Back

Kontact backend / authentication server

## Commands

Application cli:

- `docker-compose run back python manage.py <command>`

Connect to the Postgres database:

- `docker-compose exec db psql --username=<developer> --dbname=<kontact_dev>`

Backup / restore databases:

- `` docker exec -t kontact_db_1 pg_dumpall -c -U developer > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql ``
- `cat dump_***.sql | docker exec -i kontact_db_1 psql -d kontact_dev -U developer `
