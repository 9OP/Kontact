package handler

import (
	"encoding/json"
	"net/http"

	"github.com/9op/Kontact/bearer/app-v2/api/presenter"
	"github.com/9op/Kontact/bearer/app-v2/pkg"
	"github.com/9op/Kontact/bearer/app-v2/usecase/message"
)

func listMessages(service message.UseCase) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// get channel id
		channelId := pkg.Vars(r)["id"]

		// get messages
		data, err := service.ListMessages(channelId)
		if err != nil {
			presenter.InvalidParameters(w)
			return
		}

		// format data to presenter
		presenter.Render(w, http.StatusOK, data)
	})
}

func createMessage(service message.UseCase) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var input struct {
			AuthorId string `json:"authorId"`
			Data     string `json:"data"`
		}

		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			// invalid input
			presenter.InvalidParameters(w)
		}

		channelId := pkg.Vars(r)["id"]

		m, err := service.CreateMessage(input.AuthorId, channelId, input.Data)
		if err != nil {
			// cannot create message
			presenter.InvalidParameters(w)
			return
		}

		presenter.Render(w, http.StatusCreated, m)
	})
}

func MakeMessageHandlers(r *pkg.Router, service message.UseCase) {
	r.Handle("GET", "/message/<id>", listMessages(service))
	r.Handle("POST", "/message/<id>", createMessage(service))
}
