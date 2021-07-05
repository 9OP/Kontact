#!/bin/sh

# compile application
CGO_ENABLED=0 go build  -o /bin/server /app/main.go

# launch server
/bin/server
