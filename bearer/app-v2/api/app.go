package app

import (
	"fmt"
	"log"
	"net/http"

	"github.com/9op/Kontact/bearer/config"
)

func CreateApp() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", Router)

	log.Printf("Listenning on port %v", config.PORT)
	log.Fatal(http.ListenAndServe(fmt.Sprintf("0.0.0.0:%v", config.PORT), Wrap(mux)))
}
