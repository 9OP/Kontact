FROM golang:1.16-alpine AS build

WORKDIR /src

COPY . /src/
RUN CGO_ENABLED=0 go build  -o /bin/server /src/app/server.go

# FROM scratch
# COPY --from=build /bin/server /bin/server

EXPOSE 10000

ENTRYPOINT ["/bin/server"]
