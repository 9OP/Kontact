/*
Do not use in production, this is only for testing the endpoint and architecture work
*/
package repository

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/9op/Kontact/bearer/app/entity"
)

// implements usecase/message/interface.Repository
type JSONFileRepo struct {
	path string
}

// NewMessageJsonFile create new repository
func NewJSONFileRepo(path string) *JSONFileRepo {
	return &JSONFileRepo{
		path: path,
	}
}

// all messages
func (r *JSONFileRepo) all() ([]*entity.Message, error) {
	jsonFile, err := os.Open(r.path)
	if err != nil {
		return nil, err
	}
	defer jsonFile.Close()

	var messages []*entity.Message

	byteValue, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &messages)

	return messages, nil
}

// Create a message
func (r *JSONFileRepo) Create(e *entity.Message) (*entity.Message, error) {
	messages, err := r.all()
	if err != nil {
		return e, err
	}
	messages = append(messages, e)
	data, _ := json.MarshalIndent(messages, "", "  ")
	_ = ioutil.WriteFile(r.path, data, 0644)
	return e, nil
}

// List messages
func (r *JSONFileRepo) List(channelId string) ([]*entity.Message, error) {
	messages, err := r.all()
	if err != nil {
		return nil, err
	}

	var res []*entity.Message
	for _, mess := range messages {
		if mess.ChannelId == channelId {
			res = append(res, mess)
		}
	}
	return res, nil
}
