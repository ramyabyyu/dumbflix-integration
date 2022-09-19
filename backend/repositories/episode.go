package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type EpisodeRepository interface {
	FindEpisodes() ([]models.Episode, error)
	CreateEpisode(episode models.Episode) (models.Episode, error)
}

type repositoryEpisode struct {
	db *gorm.DB
}

func RepositoryEpisode(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindEpisodes() ([]models.Episode, error) {
	var episodes []models.Episode
	err := r.db.Find(&episodes).Error

	return episodes, err
}

func (r *repository) CreateEpisode(episode models.Episode) (models.Episode, error) {
	err := r.db.Create(&episode).Error
	
	return episode, err
}
