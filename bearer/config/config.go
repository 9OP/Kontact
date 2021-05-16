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
