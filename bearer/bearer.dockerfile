FROM golang:1.16-alpine AS build

WORKDIR /app

COPY . /app/
RUN CGO_ENABLED=0 go build  -o /bin/server /app/main.go

# FROM scratch
# COPY --from=build /bin/server /bin/server

EXPOSE 6000

# CMD ["/bin/server"]
