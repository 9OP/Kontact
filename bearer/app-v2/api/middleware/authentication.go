package middleware

import (
	"net/http"
	"strings"

	"github.com/9op/Kontact/bearer/config"
)

func Authentication(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Server", "Bearer")

		token := strings.Split(r.Header.Get("Authorization"), "Bearer")

		if len(token) != 2 || strings.TrimSpace(token[1]) != config.Conf.Dev.TOKEN {
			// api.RenderUnauthorized(w)
			return
		}
		h.ServeHTTP(w, r)
	})
}
