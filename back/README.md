# Kontact

![Kontact-back-CI](https://github.com/9OP/Kontact/workflows/Kontact-back-CI/badge.svg?branch=dev)

Kontact backend

#### Run app
```
docker-compose up
```

#### Run tests
```
docker-compose run back python manage.py test
```


## To do:
- Installer eventlet / flask_socketIO
- Petits tests avec soket_io

## Improvements:
- Use Python-alpine: lightweight
- Github Actions CI => utiliser postgres
- Coverage sur github
