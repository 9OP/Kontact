package api

import (
	"encoding/json"
	"net/http"
)

type apiError struct {
	Code        int    `json:"error"`
	Description string `json:"description"`
}

func httpError(w http.ResponseWriter, status int, code int, description string) {
	api_error := apiError{code, description}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(api_error)
}

func RenderUnauthorized(w http.ResponseWriter) {
	httpError(w, http.StatusUnauthorized, 401, "Unauthorized")
}
