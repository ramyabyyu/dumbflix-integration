package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type FilmRepository interface {
	FindFilm() ([]models.Film, error)
	GetFilm(slug string) (models.Film, error)
	CreateFilm(film models.Film) (models.Film, error)
	UpdateFilm(film models.Film) (models.Film, error)
	DeleteFilm(film models.Film) (models.Film, error)
}

type repositoryFilm struct {
	db *gorm.DB
}

func RepositoryFilm(db *gorm.DB) *repositoryFilm {
	return &repositoryFilm{db}
}

func (r *repositoryFilm) FindFilm() ([]models.Film, error) {
	var films []models.Film
	err := r.db.Debug().Find(&films).Error

	return films, err
}

func (r *repositoryFilm) GetFilm(slug string) (models.Film, error) {
	var film models.Film
	err := r.db.First(&film, "slug=?", slug).Error

	return film, err
}

func (r *repositoryFilm) CreateFilm(film models.Film) (models.Film, error) {
	err := r.db.Create(&film).Error

	return film, err
}

func (r *repositoryFilm) UpdateFilm(film models.Film) (models.Film, error) {
	err := r.db.Save(&film).Error

	return film, err
}

func (r *repositoryFilm) DeleteFilm(film models.Film) (models.Film, error) {
	err := r.db.Delete(&film).Error

	return film, err
}
