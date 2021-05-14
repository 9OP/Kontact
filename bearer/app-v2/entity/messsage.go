package entity

import "time"

// Message entity
type Message struct {
	AuthorId  string `json:"authorId"`
	ChannelId string `json:"channelId"`
	Data      string `json:"data"`
	Date      string `json:"date"`
}

// NewMessage create a new message
func NewMessage(authorId, channelId, data string) (*Message, error) {
	m := &Message{
		AuthorId:  authorId,
		ChannelId: channelId,
		Data:      data,
		Date:      time.Now().String(),
	}
	return m, nil
}
