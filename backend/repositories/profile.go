package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	GetProfile(ID int) (models.Profile, error)
	ChangeProfilePhoto(profile models.Profile) (models.Profile, error)
}

func RepositoryProfile(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetProfile(ID int) (models.Profile, error) {
	var profile models.Profile
	
	err := r.db.Debug().Preload("User").First(&profile, "user_id=?", ID).Error

	return profile, err
}

func (r *repository) ChangeProfilePhoto(profile models.Profile) (models.Profile, error) {
	err := r.db.Save(&profile).Error

	return profile, err
}