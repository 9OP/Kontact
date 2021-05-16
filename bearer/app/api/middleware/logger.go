package middleware

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
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
		// file path: logs/api_YYYYMMDD.log
		path, _ := filepath.Abs(fmt.Sprintf("logs/api_%v.log", time.Now().Format("20060102")))

		f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
		if err != nil {
			log.Fatalf("error opening file: %v", err)
		}
		defer f.Close()

		wrt := io.MultiWriter(os.Stdout, f)
		log.SetOutput(wrt)

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
