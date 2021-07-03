package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/9op/Kontact/bearer/app/api/presenter"
	"github.com/9op/Kontact/bearer/config"
)

type Channel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func Channels(r *http.Request) []string {
	if channels := r.Context().Value("channels"); channels != nil {
		return channels.([]string) // type cast
	}
	return nil
}

func IsUserInChannel(r *http.Request, channelId string) bool {
	for _, id := range Channels(r) {
		if id == channelId {
			return true
		}
	}
	return false
}

func Authentication(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Server", "Bearer")

		raw_token := strings.Split(r.Header.Get("Authorization"), "Bearer")
		if len(raw_token) != 2 {
			presenter.TokenInvalid(w)
			return
		}
		token := strings.TrimSpace(raw_token[1])

		client := &http.Client{Timeout: 10 * time.Second}
		req, _ := http.NewRequest("GET", fmt.Sprintf("%s/auth/whoami", config.BACKEND_API), nil)
		req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))
		resp, err := client.Do(req)
		if err != nil {
			presenter.TokenInvalid(w)
			return
		}
		defer resp.Body.Close()

		var target struct {
			Channels []Channel `json:"channels"`
		}
		json.NewDecoder(resp.Body).Decode(&target)

		var channel_ids = make([]string, len(target.Channels))
		for idx, value := range target.Channels {
			channel_ids[idx] = value.Id
		}

		ctx := context.WithValue(r.Context(), "channels", channel_ids)
		h.ServeHTTP(w, r.WithContext(ctx))
	})
}
