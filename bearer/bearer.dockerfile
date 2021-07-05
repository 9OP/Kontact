FROM golang:1.16-alpine AS build

WORKDIR /app

COPY . .

# Download dependancies
RUN go mod vendor

EXPOSE 6000
