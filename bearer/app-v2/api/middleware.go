package app

import (
	"log"
	"net/http"
	"strings"

	"github.com/9op/Kontact/bearer/app-v2/pkg"
	"github.com/9op/Kontact/bearer/config"
)

// TODO
// rename Wrap to Logger and move auth and header to middleware
// or simply separate concerns of middle ware in different files
// recal middleware signature: func middleware(h http.Handler) http.Handler

// After each hook
func Wrap(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logRespWriter := pkg.NewLogResponseWriter(w)

		func(w http.ResponseWriter, r *http.Request) {
			// Set headers
			w.Header().Set("Server", "Bearer")

			// Parse url in components
			// components := SplitComponents(r.URL.Path)

			// Set context
			// ctx := context.WithValue(r.Context(), ComponentsKey, components)

			// Check auth token
			token := strings.Split(r.Header.Get("Authorization"), "Bearer")
			if len(token) != 2 || strings.TrimSpace(token[1]) != config.Conf.Dev.TOKEN {
				// api.RenderUnauthorized(w)
				return
			}

			// h.ServeHTTP(w, r.WithContext(ctx))
			h.ServeHTTP(w, r)
		}(logRespWriter, r)

		log.Printf(":: %v %v %s :: %v\n",
			logRespWriter.StatusCode,
			r.Method,
			r.URL.Path,
			strings.Split(r.RemoteAddr, ":")[0],
		)
	})
}
