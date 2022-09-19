package models

import "time"

type Episode struct {
	ID            int    `json:"id" gorm:"primary_key:auto_increment"`
	Title         string `json:"title" form:"title" gorm:"type: varchar(255)"`
	ThumbnailFilm string `json:"thumbnail_film" form:"thumbnail_film" gorm:"type: varchar(255)"`
	LinkFilm      string `json:"link_film" form:"link_film" gorm:"type: text"`
	FilmID 		  int 	`json:"film_id"`
	Film Film `json:"film"`
	CreatedAt     time.Time `json:"-"`
	UpdatedAt     time.Time `json:"-"`
}


type FilmEpisode struct {
	Title string `json:"title"`
}

func (FilmEpisode) TableName() string {
	return "episodes"
}