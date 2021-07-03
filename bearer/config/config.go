package config

import "os"

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

var TOKEN = getEnv("TOKEN", "bearer_token")
var DATABASE_URL = getEnv("DATABASE_URL", "database.json")
var BACKEND_API = getEnv("BACKEND_API", "http://localhost:5000") // http://back:5000
