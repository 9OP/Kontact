package app

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/9op/Kontact/bearer/app/api/handler"
	"github.com/9op/Kontact/bearer/app/api/middleware"
	repository "github.com/9op/Kontact/bearer/app/database"
	"github.com/9op/Kontact/bearer/app/pkg"
	"github.com/9op/Kontact/bearer/app/usecase/message"
	"github.com/9op/Kontact/bearer/config"
)

const PORT = 6000

func CreateApp() {
	router := pkg.NewRouter()

	// messageRepository := repository.NewMessageJsonFile(config.DATABASE_URL)
	messageRepository := repository.NewMongoRepo(config.DATABASE_URL)
	messageService := message.NewService(messageRepository)
	handler.MakeMessageHandlers(router, messageService)

	router.Use(middleware.Authentication)
	router.Use(middleware.Logger)

	http.Handle("/", router)

	addr := fmt.Sprintf("0.0.0.0:%v", PORT)
	srv := &http.Server{
		Addr:         addr,
		Handler:      http.DefaultServeMux,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Printf("Start server on: %v", addr)
	log.Fatal(srv.ListenAndServe())
}
