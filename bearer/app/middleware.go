package app

import (
	"bytes"
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/9op/Kontact/bearer/app/api"
	"github.com/9op/Kontact/bearer/config"
)

// Custom reponse writer that log the status code
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

func Wrap(h http.Handler) http.Handler {

	inner := func(w http.ResponseWriter, r *http.Request) {
		logRespWriter := NewLogResponseWriter(w)

		func(w http.ResponseWriter, r *http.Request) {
			// Set headers
			w.Header().Set("Server", "Bearer")

			// Parse url in components
			components := SplitComponents(r.URL.Path)

			// Set context
			ctx := context.WithValue(r.Context(), ComponentsKey, components)

			// Check auth token
			token := strings.Split(r.Header.Get("Authorization"), "Bearer")
			if len(token) != 2 || strings.TrimSpace(token[1]) != config.TOKEN {
				api.RenderUnauthorized(w)
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
