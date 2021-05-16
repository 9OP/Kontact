package message

import (
	"github.com/9op/Kontact/bearer/app-v2/entity"
)

// Reader interface
type Reader interface {
	List(channelId string) ([]*entity.Message, error)
	// Get(id entity.ID) (*entity.Message, error)
	// Search(query string) ([]*entity.Message, error)
}

// Writer book writer
type Writer interface {
	Create(e *entity.Message) (*entity.Message, error)
	// Update(e *entity.Message) error
	// Delete(id entity.ID) error
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
	// GetMessage(id entity.ID) (*entity.Message, error)
	// SearchBooks(query string) ([]*entity.Message, error)
	// UpdateMessage(e *entity.Message) error
	// DeleteMessage(id entity.ID) error
}
