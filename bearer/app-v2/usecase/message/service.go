package message

import (
	"github.com/9op/Kontact/bearer/app-v2/entity"
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
	m, err := entity.NewMessage(authorId, channelId, data)
	if err != nil {
		return nil, err
	}
	return s.repo.Create(m)
}

// ListMessages list messages
func (s *Service) ListMessages() ([]*entity.Message, error) {
	books, err := s.repo.List()
	if err != nil {
		return nil, err
	}
	// if len(books) == 0 {
	// 	return nil, entity.ErrNotFound
	// }
	return books, nil
}
