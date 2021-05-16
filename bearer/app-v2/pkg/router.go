package pkg

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
)

type contextKey string

func (c contextKey) String() string {
	return string(c)
}

var contextVars = contextKey("vars")

func Vars(r *http.Request) map[string]string {
	vars := r.Context().Value(contextVars)
	if vars != nil {
		return vars.(map[string]string)
	}
	return map[string]string{}
}

type middleware = func(h http.Handler) http.Handler

type Router struct {
	routes      map[string]http.Handler
	middlewares []middleware
}

func NewRouter() *Router {
	// Create without sizes ?
	return &Router{
		routes:      map[string]http.Handler{},
		middlewares: []middleware{},
	}
}

// Use middleware
func (r *Router) Use(m middleware) {
	r.middlewares = append(r.middlewares, m)
}

func (r *Router) Handle(method string, path string, h http.Handler) {
	key := fmt.Sprintf("%s#%s", method, path)
	r.routes[key] = h
}

func (router *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Avoid crashing the server when panics occur in handlers
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

	// apply middlewares
	for _, m := range router.middlewares {
		handler = m(handler)
	}

	ctx := context.WithValue(r.Context(), contextVars, vars)
	handler.ServeHTTP(w, r.WithContext(ctx))
}

func match(r *http.Request, method string, pattern string, vars map[string]string) bool {
	path := split(r.URL.Path)
	components := split(pattern)

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

func split(path string) []string {
	path = strings.TrimSpace(path)
	path = strings.TrimPrefix(path, "/")
	path = strings.TrimSuffix(path, "/")
	return strings.Split(path, "/")
}
