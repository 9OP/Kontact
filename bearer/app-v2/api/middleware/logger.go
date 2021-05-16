package middleware

import (
	"log"
	"net/http"
	"strings"
)

// custom response writer that catch the status code
type logResponseWriter struct {
	http.ResponseWriter
	StatusCode int
}

func newLogResponseWriter(w http.ResponseWriter) *logResponseWriter {
	return &logResponseWriter{
		ResponseWriter: w,
	}
}

func (w *logResponseWriter) WriteHeader(code int) {
	w.StatusCode = code
	w.ResponseWriter.WriteHeader(code)
}

func Logger(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logRespWriter := newLogResponseWriter(w)

		// Wrap the input handler in anonymous function call
		func(w http.ResponseWriter, r *http.Request) {
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
