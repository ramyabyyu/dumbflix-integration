package models

import "time"

type Film struct {
	ID            int    `json:"id" gorm:"primary_key:auto_increment"`
	Title         string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Slug string `json:"slug" gorm:"type: text"`
	ThumbnailFilm string `json:"thumbnail_film" form:"thumbnail_film" gorm:"type: varchar(255)"`
	LinkFilm string `json:"link_film" form:"link_film" gorm:"type: varchar(255)"`
	Description   string `json:"description" form:"description" gorm:"type: text"`
	Year          string    `json:"year" form:"year" gorm:"type: varchar(255)"`
	Category      string `json:"category" form:"category" gorm:"type: varchar(255)"`
	UserID        int    `json:"user_id"`
	User          User   `json:"user"`
	CreatedAt     time.Time `json:"-"`
	UpdatedAt     time.Time `json:"-"`
}

type UserFilm struct {
	Title string `json:"title"`
}

func (UserFilm) TableName() string {
	return "films"
}