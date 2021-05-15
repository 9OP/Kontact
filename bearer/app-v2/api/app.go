package app

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/9op/Kontact/bearer/app-v2/api/handler"
	repository "github.com/9op/Kontact/bearer/app-v2/database"
	pkg "github.com/9op/Kontact/bearer/app-v2/pkg"
	"github.com/9op/Kontact/bearer/app-v2/usecase/message"
	"github.com/9op/Kontact/bearer/config"
)

func CreateApp() {
	router := pkg.NewRouter() // custom router

	messageRepository := repository.NewMessageJsonFile(config.Conf.Dev.DATABASE_URL)
	messageService := message.NewService(messageRepository)
	handler.MakeMessageHandlers(router, messageService)

	// router.Use(func)

	http.Handle("/", router)

	addr := fmt.Sprintf("0.0.0.0:%v", config.PORT)
	srv := &http.Server{
		Addr:         addr,
		Handler:      Wrap(http.DefaultServeMux),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Printf("Start server on: %v", addr)
	log.Fatal(srv.ListenAndServe())
}
