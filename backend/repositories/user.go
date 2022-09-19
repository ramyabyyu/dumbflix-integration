package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetUser(ID int) (models.User, error)
	ChangeUserRole(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	// Using Preload("profile") to find data with relation to profile and Preload("Products") for relation to Products here ...
	err := r.db.Preload("Profile").First(&user, ID).Error

	return user, err
}

func (r *repository) ChangeUserRole(user models.User) (models.User, error) {
	err := r.db.Debug().Save(&user).Error

	return user, err
}