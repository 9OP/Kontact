package pkg

import (
	"net/http"
)

type LogResponseWriter struct {
	http.ResponseWriter
	StatusCode int
}

func NewLogResponseWriter(w http.ResponseWriter) *LogResponseWriter {
	return &LogResponseWriter{
		ResponseWriter: w,
	}
}

func (w *LogResponseWriter) WriteHeader(code int) {
	w.StatusCode = code
	w.ResponseWriter.WriteHeader(code)
}

// func (w *LogResponseWriter) Write(body []byte) (int, error) {
// 	w.buf.Write(body)
// 	return w.ResponseWriter.Write(body)
// }
