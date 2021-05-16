package message

import (
	"github.com/9op/Kontact/bearer/app/entity"
)

// Reader interface
type Reader interface {
	List(channelId string) ([]*entity.Message, error)
}

// Writer book writer
type Writer interface {
	Create(e *entity.Message) (*entity.Message, error)
}

// Repository interface
type Repository interface {
	Reader
	Writer
}

// UseCase interface
type UseCase interface {
	ListMessages(channelId string) ([]*entity.Message, error)
	CreateMessage(authorId, channelId, data string) (*entity.Message, error)
}
