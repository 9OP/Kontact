package entity

import "time"

// Message entity
type Message struct {
	Id        string    `json:"id" bson:"_id,omitempty"`
	AuthorId  string    `json:"authorId"`
	ChannelId string    `json:"channelId"`
	Content   string    `json:"content"`
	Iv        []int     `json:"iv"`
	Date      time.Time `json:"date"`
}

func NewMessage(authorId, channelId, content string, iv []int) *Message {
	m := &Message{
		AuthorId:  authorId,
		ChannelId: channelId,
		Content:   content,
		Iv:        iv,
		Date:      time.Now(),
	}
	return m
}
