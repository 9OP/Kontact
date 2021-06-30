package handler

import (
	"encoding/json"
	"net/http"

	"github.com/9op/Kontact/bearer/app/api/presenter"
	"github.com/9op/Kontact/bearer/app/pkg"
	"github.com/9op/Kontact/bearer/app/usecase/message"
)

func listMessages(service message.UseCase) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		channelId := pkg.Vars(r)["id"]

		data, err := service.ListMessages(channelId)
		if err != nil {
			presenter.Badrequest(w, err.Error())
			return
		}

		presenter.Render(w, http.StatusOK, data)
	})
}

type MessageInput struct {
	AuthorId string `json:"authorId" validation:"required"`
	Data     string `json:"data" validation:"required"`
}

func createMessage(service message.UseCase) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		input := MessageInput{}
		validator := pkg.NewValidator(&input)

		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			presenter.Badrequest(w, err.Error())
			return
		}

		err = validator.Validate()
		if err != nil {
			presenter.Badrequest(w, err.Error())
			return
		}

		channelId := pkg.Vars(r)["id"]

		m, err := service.CreateMessage(input.AuthorId, channelId, input.Data)
		if err != nil {
			presenter.Badrequest(w, err.Error())
			return
		}

		presenter.Render(w, http.StatusCreated, m)
	})
}

func MakeMessageHandlers(r *pkg.Router, service message.UseCase) {
	r.Handle("GET", "/message/:id", listMessages(service))
	r.Handle("POST", "/message/:id", createMessage(service))
}
