package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetAllUsers() ([]models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetAllUsers() ([]models.User, error) {
	var users []models.User

	err := r.db.Find(&users).Error

	return users, err
}