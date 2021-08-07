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


## ToDo (sorted by priority)
- [ ] presence in members sidebar (dynamic status: red/green badge, plus join)
- [ ] name generators
- [ ] kick / refuse access to channel
- [ ] create chakra ui theme
- [ ] reload channel and membership when channel master accept user
- [ ] join + channel token
- [ ] encryption signature message
- [ ] error handling if bad encryption, errors etc...
