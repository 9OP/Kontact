package models

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"time"

	"github.com/9op/Kontact/bearer/config"
)

var DATABASE = Database{Path: config.DATABASE_URL}

type Database struct {
	Path string
}

func (db Database) GetMessages(channelId string) []Message {
	jsonFile, err := os.Open(db.Path)
	if err != nil {
		return []Message{}
	}
	defer jsonFile.Close()

	var messages []Message

	byteValue, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &messages)
	return messages
}

func (db Database) PostMessage(channelId string, mess IPostMessage) {
	messages := db.GetMessages(channelId)
	messages = append(messages, Message{
		AuthorId:  mess.AuthorId,
		ChannelId: channelId,
		Data:      mess.Data,
		Date:      time.Now().String(),
	})
	data, _ := json.MarshalIndent(messages, "", " ")
	_ = ioutil.WriteFile(db.Path, data, 0644)
}
