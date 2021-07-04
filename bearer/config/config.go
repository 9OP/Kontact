package config

import "os"

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

var DATABASE_URL = getEnv("DATABASE_URL", "database.json")
var BACKEND_API = getEnv("BACKEND_API", "http://back:5000") // http://localhost:5000
