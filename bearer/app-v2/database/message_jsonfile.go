package repository

import (
	"encoding/json"
	"io/ioutil"
	"os"

	"github.com/9op/Kontact/bearer/app-v2/entity"
)

// Message jsonfile repo - single jsonFile storage
// implements usecase/message/interface.Repository
type MessageJsonFile struct {
	path string
}

// NewMessageJsonFile create new repository
func NewMessageJsonFile(path string) *MessageJsonFile {
	return &MessageJsonFile{
		path: path,
	}
}

// Create a message
func (r *MessageJsonFile) Create(e *entity.Message) (*entity.Message, error) {
	messages, err := r.List()
	if err != nil {
		return nil, err
	}
	messages = append(messages, e)
	data, _ := json.MarshalIndent(messages, "", " ")
	_ = ioutil.WriteFile(r.path, data, 0644)
	return e, nil
}

// List messages
func (r *MessageJsonFile) List() ([]*entity.Message, error) {
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
