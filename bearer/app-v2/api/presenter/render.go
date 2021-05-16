package presenter

import (
	"encoding/json"
	"net/http"
)

type apiError struct {
	Code        int    `json:"code"`
	Description string `json:"description"`
}

func unauthorized(w http.ResponseWriter, description string) {
	Render(
		w,
		http.StatusUnauthorized,
		apiError{
			Code:        401,
			Description: description,
		},
	)
}

func badrequest(w http.ResponseWriter, description string) {
	Render(
		w,
		http.StatusBadRequest,
		apiError{
			Code:        400,
			Description: description,
		},
	)
}

// TokenInvalid render unauthorized
func TokenInvalid(w http.ResponseWriter) {
	unauthorized(w, "Token invalid")
}

// InvalidParameters render badrequest
func InvalidParameters(w http.ResponseWriter) {
	badrequest(w, "Parameters are invalid")
}

// Render jsonified data
func Render(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
