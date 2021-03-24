# Back

Kontact backend / authentication server

**listen on: localhost:5000**

## Commands

```
Usage: manage.py [OPTIONS] COMMAND [ARGS]...

Options:
  --version  Show the flask version
  --help     Show this message and exit.

Commands:
  create_db  Create database (dev only)
  db         Perform database migrations.
  routes     Show the routes for the app.
  run        Run a development server.
  seed       Seed database w/ fake data
  shell      Run a shell in the app context.
  test       Run tests
```

## Database

**Backup:**

```
docker exec -t <db_container> pg_dumpall -c -U <db_admin> > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
```

**Restore:**

```
cat <dump.sql> | docker exec -i <db_container> psql -d <db_name> -U <db_admin>
```

## Build and run

```
docker build . -f back.dockerfile -t back && docker run back
```

## Config

`.env`

```
# App
FLASK_ENV=development
SECRET_KEY=secret
CORS_ORIGINS=https://front.domain.com
REFERER=https://front.domain.com

# Web server
WEB_LOG=debug
WEB_RELOAD=true

# Database
DB_USER=postgres:secret
DB_ADDR=database:5432
DB_NAME=dev
```
