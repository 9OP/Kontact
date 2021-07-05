package config

import "os"

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

// mongo, back when in docker-compose,
// else localhost

var DATABASE_URL = getEnv("DATABASE_URL", "mongodb://mongo:27017/") // mongodb://localhost:27017/
var BACKEND_API = getEnv("BACKEND_API", "http://back:5000")         // http://localhost:5000
