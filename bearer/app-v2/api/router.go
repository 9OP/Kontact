package app

import (
	"log"
	"net/http"

	h "github.com/9op/Kontact/bearer/app-v2/api/handler"
	repository "github.com/9op/Kontact/bearer/app-v2/database"
	"github.com/9op/Kontact/bearer/app-v2/usecase/message"
	"github.com/9op/Kontact/bearer/config"
)

// ROUTER
//
func Router(w http.ResponseWriter, r *http.Request) {
	defer func() {
		if err := recover(); err != nil {
			log.Printf(":: panic, %v", err)
			http.Error(w, "server error", http.StatusInternalServerError)
		}
	}()

	vars := map[string]string{}
	var handler http.Handler

	// Router
	// GET /message/<channel_id>
	// POST /message/<channel_id>

	messageRepository := repository.NewMessageJsonFile(config.Conf.Dev.DATABASE_URL)
	messageService := message.NewService(messageRepository)

	switch {
	case match(r, "GET", "/message/<id>", vars):
		// handler = get(api.Channel{Id: vars["id"]}.GetMessages)
		handler = h.ListMessages(messageService)
	case match(r, "POST", "/message/<id>", vars):
		// handler = post(api.Channel{Id: vars["id"]}.PostMessage)
		handler = h.CreateMessage(messageService)

	default:
		http.NotFound(w, r)
		return
	}
	handler.ServeHTTP(w, r)
}

func match(r *http.Request, method string, pattern string, vars map[string]string) bool {
	path := r.Context().Value(ComponentsKey).([]string)
	components := SplitComponents(pattern)

	if r.Method != method || len(path) != len(components) {
		return false
	}

	for i, c := range components {
		switch {
		case c == path[i]:
			continue
		case string(c[0]) == "<" && string(c[len(c)-1]) == ">":
			vars[c[1:len(c)-1]] = path[i]
			continue
		default:
			return false
		}
	}

	return true
}

func allowMethod(h http.HandlerFunc, method string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// if method != r.Method {
		// 	w.Header().Set("Allow", method)
		// 	httpError(w, http.StatusMethodNotAllowed, 410, "Not allowed")
		// 	return
		// }
		h(w, r)
	}
}

func get(h http.HandlerFunc) http.HandlerFunc {
	return allowMethod(h, "GET")
}

func post(h http.HandlerFunc) http.HandlerFunc {
	return allowMethod(h, "POST")
}
