package api

import (
	"encoding/json"
	"net/http"

	models "github.com/9op/Kontact/bearer/app/models"
)

// Channel id
type Channel struct {
	Id string
}

func (c Channel) PostMessage(w http.ResponseWriter, r *http.Request) {
	var message models.IPostMessage
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	models.DATABASE.PostMessage(c.Id, message)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(message)
}

func (c Channel) GetMessages(w http.ResponseWriter, r *http.Request) {
	var res []models.IGetMessage
	messages := models.DATABASE.GetMessages(c.Id)

	for _, mess := range messages {
		if mess.ChannelId == c.Id {
			res = append(res, mess.Summary())
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}
