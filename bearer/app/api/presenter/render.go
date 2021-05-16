package presenter

import (
	"encoding/json"
	"net/http"
)

type apiError struct {
	Code        int    `json:"code"`
	Description string `json:"description"`
}

func Unauthorized(w http.ResponseWriter, description string) {
	Render(
		w,
		http.StatusUnauthorized,
		apiError{
			Code:        401,
			Description: description,
		},
	)
}

func Badrequest(w http.ResponseWriter, description string) {
	Render(
		w,
		http.StatusBadRequest,
		apiError{
			Code:        400,
			Description: description,
		},
	)
}

func NotFound(w http.ResponseWriter, description string) {
	Render(
		w,
		http.StatusNotFound,
		apiError{
			Code:        404,
			Description: description,
		},
	)
}

func ServerError(w http.ResponseWriter, description string) {
	Render(
		w,
		http.StatusInternalServerError,
		apiError{
			Code:        1000,
			Description: description,
		},
	)
}

func TokenInvalid(w http.ResponseWriter) {
	Unauthorized(w, "Token invalid")
}

func InvalidParameters(w http.ResponseWriter) {
	Badrequest(w, "Parameters are invalid")
}

// Render jsonified data
func Render(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
