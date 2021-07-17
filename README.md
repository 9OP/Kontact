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


## ToDo
- [x] Flattened front architecture (less nested and and regroup components) (almost)
- [x] Support for #id user search
- [x] Add loading spinner for members and message loading (almost)
- [ ] Remove channel header / rework something more pretty
- [ ] Find a tool/service for mongo db management
- [ ] Create guest mode
- [ ] Implement e2e encryption
- [ ] create chakra ui theme
