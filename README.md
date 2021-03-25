# Kontact

E2E encrypted fast chat

## Run

```
docker-compose up --build
```

Application at: https://localhost
API at: https://localhost/api
Adminer at: https://localhost/database

```
Systeme: PostgresSQL
Server: database
User: developer
Password: secret
Database: kontact_dev
```

## Tests

**Back:**

```
docker-compose run back python manage.py test
```
