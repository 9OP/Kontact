package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

type contextKey string

func (c contextKey) String() string {
	return string(c)
}

var componentsKey = contextKey("components")

const PORT = 10000
const TOKEN = "bearer_token"

var DATABASE = Database{Path: "database.json"}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", router)

	log.Printf("Listenning on port %v", PORT)
	log.Fatal(http.ListenAndServe(fmt.Sprintf("localhost:%v", PORT), wrap(mux)))
}

// middleware
func wrap(h http.Handler) http.Handler {

	inner := func(w http.ResponseWriter, r *http.Request) {
		logRespWriter := NewLogResponseWriter(w)

		func(w http.ResponseWriter, r *http.Request) {
			// Set headers
			w.Header().Set("Server", "Bearer")

			// Parse url in components
			components := splitComponents(r.URL.Path)

			// Set context
			ctx := context.WithValue(r.Context(), componentsKey, components)

			// Check auth token
			token := strings.Split(r.Header.Get("Authorization"), "Bearer")
			if len(token) != 2 || strings.TrimSpace(token[1]) != TOKEN {
				renderUnauthorized(w)
				return
			}

			h.ServeHTTP(w, r.WithContext(ctx))
		}(logRespWriter, r)

		log.Printf(":: %v %v %s :: %v\n",
			logRespWriter.statusCode,
			r.Method,
			r.URL.Path,
			strings.Split(r.RemoteAddr, ":")[0],
		)
	}

	return http.HandlerFunc(inner)
}

type LogResponseWriter struct {
	http.ResponseWriter
	statusCode int
	buf        bytes.Buffer
}

func NewLogResponseWriter(w http.ResponseWriter) *LogResponseWriter {
	return &LogResponseWriter{ResponseWriter: w}
}

func (w *LogResponseWriter) WriteHeader(code int) {
	w.statusCode = code
	w.ResponseWriter.WriteHeader(code)
}

func (w *LogResponseWriter) Write(body []byte) (int, error) {
	w.buf.Write(body)
	return w.ResponseWriter.Write(body)
}

func splitComponents(path string) []string {
	path = strings.TrimSpace(path)
	path = strings.TrimPrefix(path, "/")
	path = strings.TrimSuffix(path, "/")
	return strings.Split(path, "/")
}

// ROUTER
//
func router(w http.ResponseWriter, r *http.Request) {
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

	switch {
	case match(r, "GET", "/message/<id>", vars):
		handler = get(channel{vars["id"]}.get)
	case match(r, "POST", "/message/<id>", vars):
		handler = post(channel{vars["id"]}.post)
	default:
		http.NotFound(w, r)
		return
	}
	handler.ServeHTTP(w, r)
}

func match(r *http.Request, method string, pattern string, vars map[string]string) bool {
	path := r.Context().Value(componentsKey).([]string)
	components := splitComponents(pattern)

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

// API ERROR
//
type apiError struct {
	Code        int    `json:"error"`
	Description string `json:"description"`
}

func httpError(w http.ResponseWriter, status int, code int, description string) {
	api_error := apiError{code, description}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(api_error)
}

func renderUnauthorized(w http.ResponseWriter) {
	httpError(w, http.StatusUnauthorized, 401, "Unauthorized")
}

// func render(w http.ResponseWriter, data interface{})

// API METHODS
//
func allowMethod(h http.HandlerFunc, method string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if method != r.Method {
			w.Header().Set("Allow", method)
			httpError(w, http.StatusMethodNotAllowed, 410, "Not allowed")
			return
		}
		h(w, r)
	}
}

func get(h http.HandlerFunc) http.HandlerFunc {
	return allowMethod(h, "GET")
}

func post(h http.HandlerFunc) http.HandlerFunc {
	return allowMethod(h, "POST")
}

// RESOURCES
//
type Message struct {
	Date      string `json:"date"`
	AuthorId  string `json:"authorId"`
	Data      string `json:"data"`
	ChannelId string `json:"channelId"`
	// signature
	// key
}

func (m Message) Summary() getMessage {
	return getMessage{
		AuthorId: m.AuthorId,
		Data:     m.Data,
		Date:     m.Date,
	}
}

// DATABASE
//

// type dbConnector interface {
// 	getMessages(channelId string) []Message
// 	postMessage(mess Message)
// }

type Database struct {
	Path string
}

type postMessage struct {
	AuthorId string `json:"authorId"`
	Data     string `json:"data"`
}

type getMessage struct {
	AuthorId string `json:"authorId"`
	Data     string `json:"data"`
	Date     string `json:"date"`
}

func (db Database) getMessages(channelId string) []Message {
	jsonFile, err := os.Open(db.Path)
	if err != nil {
		return []Message{}
	}
	defer jsonFile.Close()

	var messages []Message

	byteValue, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &messages)
	return messages
}

func (db Database) postMessage(channelId string, mess postMessage) {
	messages := db.getMessages(channelId)
	messages = append(messages, Message{
		AuthorId:  mess.AuthorId,
		ChannelId: channelId,
		Data:      mess.Data,
		Date:      time.Now().String(),
	})
	data, _ := json.MarshalIndent(messages, "", " ")
	_ = ioutil.WriteFile(db.Path, data, 0644)
}

// CONTROLLERS
//

type channel struct {
	id string
}

func (c channel) post(w http.ResponseWriter, r *http.Request) {
	var message postMessage
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	DATABASE.postMessage(c.id, message)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(message)
}

func (c channel) get(w http.ResponseWriter, r *http.Request) {
	var res []getMessage
	messages := DATABASE.getMessages(c.id)

	for _, mess := range messages {
		if mess.ChannelId == c.id {
			res = append(res, mess.Summary())
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}
