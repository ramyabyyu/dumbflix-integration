package filmdto

type FilmRequest struct {
	Title         string `json:"title" form:"title" gorm:"type: varchar(255)"`
	ThumbnailFilm string `json:"thumbnail_film" form:"thumbnail_film" gorm:"type: varchar(255)"`
	Description   string `json:"description" form:"description" gorm:"type: text"`
	Year          string `json:"year" form:"year"`
	Category      string `json:"category" form:"category" gorm:"type: varchar(255)"`
	LinkFilm      string `json:"link_film" form:"link_film" gorm:"type: varchar(255)"`
}