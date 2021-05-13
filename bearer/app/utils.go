package app

import "strings"

type contextKey string

func (c contextKey) String() string {
	return string(c)
}

var ComponentsKey = contextKey("components")

// Split by "/" and return path's components
func SplitComponents(path string) []string {
	path = strings.TrimSpace(path)
	path = strings.TrimPrefix(path, "/")
	path = strings.TrimSuffix(path, "/")
	return strings.Split(path, "/")
}
