package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/9op/Kontact/bearer/app-v2/pkg"
	"github.com/9op/Kontact/bearer/app-v2/usecase/message"
)

type apiError struct {
	Code        int    `json:"error"`
	Description string `json:"description"`
}

var listError = apiError{Code: 401, Description: "Cannot get list of messages"}
var invalidParametersError = apiError{Code: 402, Description: "Invalid parameters"}
var createError = apiError{Code: 401, Description: "Cannot create message"}

func render(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func listMessages(service message.UseCase) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// get channel id

		// get messages
		data, err := service.ListMessages()
		if err != nil {
			fmt.Print(err)
			render(w, 401, listError)
			return
		}

		// format data to presenter
		render(w, 200, data)

		// errorMessage := "Error reading books"
		// var data []*entity.Message
		// var err error
		// title := r.URL.Query().Get("title")
		// switch {
		// case title == "":
		// 	data, err = service.ListBooks()
		// default:
		// 	data, err = service.SearchBooks(title)
		// }
		// w.Header().Set("Content-Type", "application/json")
		// if err != nil && err != entity.ErrNotFound {
		// 	w.WriteHeader(http.StatusInternalServerError)
		// 	w.Write([]byte(errorMessage))
		// 	return
		// }

		// if data == nil {
		// 	w.WriteHeader(http.StatusNotFound)
		// 	w.Write([]byte(errorMessage))
		// 	return
		// }
		// var toJ []*presenter.Book
		// for _, d := range data {
		// 	toJ = append(toJ, &presenter.Book{
		// 		ID:       d.ID,
		// 		Title:    d.Title,
		// 		Author:   d.Author,
		// 		Pages:    d.Pages,
		// 		Quantity: d.Quantity,
		// 	})
		// }
		// if err := json.NewEncoder(w).Encode(toJ); err != nil {
		// 	w.WriteHeader(http.StatusInternalServerError)
		// 	w.Write([]byte(errorMessage))
		// }
	})
}

func createMessage(service message.UseCase) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var input struct {
			AuthorId string `json:"title"`
			Data     string `json:"data"`
		}

		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			render(w, 401, invalidParametersError)
		}

		channelId := "123"

		m, err := service.CreateMessage(input.AuthorId, channelId, input.Data)
		if err != nil {
			render(w, 401, createError)
			return
		}

		render(w, 201, m)
		// errorMessage := "Error adding book"
		// var input struct {
		// 	Title    string `json:"title"`
		// 	Author   string `json:"author"`
		// 	Pages    int    `json:"pages"`
		// 	Quantity int    `json:"quantity"`
		// }
		// err := json.NewDecoder(r.Body).Decode(&input)
		// if err != nil {
		// 	log.Println(err.Error())
		// 	w.WriteHeader(http.StatusInternalServerError)
		// 	w.Write([]byte(errorMessage))
		// 	return
		// }
		// id, err := service.CreateBook(input.Title, input.Author, input.Pages, input.Quantity)
		// if err != nil {
		// 	w.WriteHeader(http.StatusInternalServerError)
		// 	w.Write([]byte(errorMessage))
		// 	return
		// }
		// toJ := &presenter.Book{
		// 	ID:       id,
		// 	Title:    input.Title,
		// 	Author:   input.Author,
		// 	Pages:    input.Pages,
		// 	Quantity: input.Quantity,
		// }

		// w.WriteHeader(http.StatusCreated)
		// if err := json.NewEncoder(w).Encode(toJ); err != nil {
		// 	log.Println(err.Error())
		// 	w.WriteHeader(http.StatusInternalServerError)
		// 	w.Write([]byte(errorMessage))
		// 	return
		// }
	})
}

func MakeMessageHandlers(r *pkg.Router, service message.UseCase) {
	r.Handle("GET", "/message/<id>", listMessages(service))
	r.Handle("POST", "/message/<id>", createMessage(service))
}
