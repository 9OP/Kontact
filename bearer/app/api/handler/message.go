package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/9op/Kontact/bearer/app/api/middleware"
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

func createMessage(service message.UseCase) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var input struct {
			Content string `json:"content" validation:"required"`
			Iv      []int  `json:"iv" validation:"required"`
		}
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
		authorId := middleware.GetUserId(r)

		m, err := service.CreateMessage(authorId, channelId, input.Content, input.Iv)
		if err != nil {
			presenter.Badrequest(w, err.Error())
			return
		}

		presenter.Render(w, http.StatusCreated, m)
	})
}

// Block requests when user is not a channel member
func channelGate(h http.Handler) http.Handler { // middleware
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		channelId := pkg.Vars(r)["id"]

		if middleware.IsUserInChannel(r, channelId) {
			h.ServeHTTP(w, r)
		} else {
			presenter.Unauthorized(w, fmt.Sprintf("User is not a member of channel %v", channelId))
		}
	})
}

func MakeMessageHandlers(r *pkg.Router, service message.UseCase) {
	r.Handle("GET", "/message/:id", channelGate(listMessages(service)))
	r.Handle("POST", "/message/:id", channelGate(createMessage(service)))
}
