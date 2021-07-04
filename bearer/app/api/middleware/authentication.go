package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/9op/Kontact/bearer/app/api/presenter"
	"github.com/9op/Kontact/bearer/app/pkg"
	"github.com/9op/Kontact/bearer/config"
)

type User struct {
	Id       string   // user_id
	Channels []string // channel_ids
}

const keyUser pkg.Key = "user"

func getChannels(r *http.Request) []string {
	user := r.Context().Value(keyUser).(User)
	return user.Channels
}

func GetUserId(r *http.Request) string {
	user := r.Context().Value(keyUser).(User)
	return user.Id
}

func IsUserInChannel(r *http.Request, channelId string) bool {
	for _, id := range getChannels(r) {
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
			Id       string `json:"id"`
			Channels []struct {
				Id string `json:"id"`
			} `json:"channels"`
		}
		json.NewDecoder(resp.Body).Decode(&target)

		var channel_ids = make([]string, len(target.Channels))
		for idx, value := range target.Channels {
			channel_ids[idx] = value.Id
		}

		user := User{
			Id:       target.Id,
			Channels: channel_ids,
		}

		ctx := context.WithValue(r.Context(), keyUser, user)
		h.ServeHTTP(w, r.WithContext(ctx))
	})
}
