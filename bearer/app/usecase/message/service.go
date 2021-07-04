package message

import (
	"github.com/9op/Kontact/bearer/app/entity"
)

// Service message usecase
type Service struct {
	repo Repository
}

// NewService create new service
func NewService(r Repository) *Service {
	return &Service{
		repo: r,
	}
}

// CreateMessage create a message
func (s *Service) CreateMessage(authorId, channelId, data string) (*entity.Message, error) {
	m := entity.NewMessage(authorId, channelId, data)

	return s.repo.Create(m) // repo.create handles the creation of message id
}

// ListMessages list messages
func (s *Service) ListMessages(channelId string) ([]*entity.Message, error) {
	messages, err := s.repo.List(channelId)
	if err != nil {
		return nil, err
	}
	return messages, nil
}
