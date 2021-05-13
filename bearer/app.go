package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/9op/Kontact/bearer/app"
	"github.com/9op/Kontact/bearer/config"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", app.Router)

	log.Printf("Listenning on port %v", config.PORT)
	log.Fatal(http.ListenAndServe(fmt.Sprintf("0.0.0.0:%v", config.PORT), app.Wrap(mux)))
}
