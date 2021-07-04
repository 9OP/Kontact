package pkg

import (
	"context"
	"net/http"
	"regexp"
	"strings"
)

func split(path string) []string {
	path = strings.TrimSpace(path)
	path = strings.TrimPrefix(path, "/")
	path = strings.TrimSuffix(path, "/")
	return strings.Split(path, "/")
}

//
//
// Router
type Key string

const keyVars Key = "vars"

type middleware = func(h http.Handler) http.Handler

type Router struct {
	trie        *node
	middlewares []middleware
}

func NewRouter() *Router {
	return &Router{
		trie:        newNode(),
		middlewares: []middleware{},
	}
}

func (router *Router) Use(m middleware) {
	router.middlewares = append(router.middlewares, m)
}

func (router *Router) Handle(method, path string, h http.Handler) {
	node := router.trie.append(split(path))
	node.handlers[method] = h
}

func (router *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	defer func() {
		if err := recover(); err != nil {
			http.Error(w, "server error", http.StatusInternalServerError)
		}
	}()

	handler := http.NotFoundHandler()
	vars := map[string]string{}

	if h := router.match(r, vars); h != nil {
		handler = h
		for _, m := range router.middlewares {
			handler = m(handler)
		}
	}

	ctx := context.WithValue(r.Context(), keyVars, vars)
	handler.ServeHTTP(w, r.WithContext(ctx))
}

func (router *Router) match(r *http.Request, vars map[string]string) http.Handler {
	if node := router.trie.search(split(r.URL.Path), vars); node != nil {
		return node.handlers[r.Method]
	}
	return nil
}

func Vars(r *http.Request) map[string]string {
	if vars := r.Context().Value(keyVars); vars != nil {
		return vars.(map[string]string) // type cast
	}
	return nil
}

//
//
// Trie

type node struct {
	handlers map[string]http.Handler
	leaves   map[string]*node
	regex    map[string]*regexp.Regexp
}

func newNode() *node {
	return &node{
		handlers: map[string]http.Handler{},
		leaves:   map[string]*node{},
		regex:    map[string]*regexp.Regexp{},
	}
}

func (node *node) getLeaf(v string) (*node, []string) {
	if node, ok := node.leaves[v]; ok {
		return node, nil
	}
	for key, regex := range node.regex {
		if regex.MatchString(v) {
			return node.leaves[key], []string{key, v}
		}
	}
	return nil, nil
}

func parse(c string) (string, *regexp.Regexp) {
	if string(c[0]) == ":" {
		// Given c=":id:^[0-9]$", then pattern=["id" "^[0-9]$"]
		pattern := strings.Split(c[1:], ":")
		regex := ".*"
		if len(pattern) > 1 {
			regex = pattern[1]
		}
		if re, err := regexp.Compile(regex); err == nil {
			return pattern[0], re
		}
	}
	return c, nil
}

func (node *node) append(path []string) *node {
	if len(path) == 0 {
		return node
	}
	component, regex := parse(path[0])

	leaf, _ := node.getLeaf(component)
	if leaf == nil {
		node.leaves[component] = newNode()
		leaf = node.leaves[component]

		if regex != nil {
			node.regex[component] = regex
		}
	}

	return leaf.append(path[1:])
}

func (node *node) search(path []string, vars map[string]string) *node {
	if len(path) == 0 {
		return node
	}

	leaf, pattern := node.getLeaf(path[0])
	if leaf == nil {
		return nil
	}

	if pattern != nil {
		vars[pattern[0]] = pattern[1]
	}

	return leaf.search(path[1:], vars)
}
