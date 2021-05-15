package config

// Configuration data
type config struct {
	PORT         int
	TOKEN        string
	DATABASE_URL string
}

// Config collections
type repository struct {
	Dev  config
	Test config
	Prod config
}

var dev = config{
	PORT:         10000,
	TOKEN:        "bearer_token",
	DATABASE_URL: "database.json",
}

var test = config{}
var prod = config{}

var Conf = repository{
	Dev:  dev,
	Test: test,
	Prod: prod,
}

// var Conf = map[string]Config{
// 	"Dev": confDev,
// }

const PORT = 10000
const TOKEN = "bearer_token"
const DATABASE_URL = "database.json"
