package models

type Message struct {
	Date      string `json:"date"`
	AuthorId  string `json:"authorId"`
	Data      string `json:"data"`
	ChannelId string `json:"channelId"`
	// signature
	// key
}

func (m Message) Summary() IGetMessage {
	return IGetMessage{
		AuthorId: m.AuthorId,
		Data:     m.Data,
		Date:     m.Date,
	}
}

type IPostMessage struct {
	AuthorId string `json:"authorId"`
	Data     string `json:"data"`
}

type IGetMessage struct {
	AuthorId string `json:"authorId"`
	Data     string `json:"data"`
	Date     string `json:"date"`
}
