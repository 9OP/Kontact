# Bearer

Kontact bearer (message storing API)

**listen on: localhost:6000**

---
The binary is not build in the dockerfile but in the startup.sh file. The main reason is to prevent rebuilding the image
when source files change. It is not great because it cause longer starting time of the container, but this is most practical in development.

## Mongo shell


basic command to look into the mongo db
```
docker exec -it kontact_mongo mongo
show dbs
use kontact
db.getCollectionNames()
db.messages.find().pretty()

Create admin:
db.createUser({
... user: "admin",
... pwd: "PASSWORD",
... roles: ["readWrite","dbAdmin"]
... })
```

With adminer:
```
docker exec -u root -it kontact_adminer sh
apk add autoconf gcc g++ make libffi-dev openssl-dev
pecl install mongodb
echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/docker-php-ext-mongodb.ini
restart docker container.
```

export mongo data:
```
docker -ti kontact_mongo mongoexport --collection=messages --db=kontact --out=output.json
docker cp kontact_mongo:/output.json .
```
