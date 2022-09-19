package models

import "time"

type Episode struct {
	ID            int    `json:"id" gorm:"primary_key:auto_increment"`
	Title         string `json:"title" form:"title" gorm:"type: varchar(255)"`
	ThumbnailEpisode string `json:"thumbnail_episode" form:"thumbnail_episode" gorm:"type: text"`
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