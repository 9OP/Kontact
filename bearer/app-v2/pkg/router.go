package pkg

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	// h "github.com/9op/Kontact/bearer/app-v2/api/handler"
)

func Split(path string) []string {
	path = strings.TrimSpace(path)
	path = strings.TrimPrefix(path, "/")
	path = strings.TrimSuffix(path, "/")
	return strings.Split(path, "/")
}

type MyRouter struct {
	routes map[string]http.Handler
}

func NewRouter() *MyRouter {
	return &MyRouter{
		routes: make(map[string]http.Handler),
	}
}

func (r *MyRouter) Handle(method string, path string, h http.Handler) {
	key := fmt.Sprintf("%s#%s", method, path)
	r.routes[key] = h
}

func (router *MyRouter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	defer func() {
		if err := recover(); err != nil {
			log.Printf(":: panic, %v", err)
			http.Error(w, "server error", http.StatusInternalServerError)
		}
	}()

	vars := map[string]string{}
	var handler http.Handler = nil

	for key, value := range router.routes {
		route := strings.Split(key, "#")

		method := route[0]
		path := route[1]

		if match(r, method, path, vars) {
			handler = value
			break
		}
	}

	if handler == nil {
		http.NotFound(w, r)
		return
	}

	// TODO: put vars in context
	handler.ServeHTTP(w, r)
}

// TODO
// func Vars(r *http.Request) map[string]string

func match(r *http.Request, method string, pattern string, vars map[string]string) bool {
	// path := r.Context().Value(api.ComponentsKey).([]string)
	path := Split(r.URL.Path)
	components := Split(pattern)

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
