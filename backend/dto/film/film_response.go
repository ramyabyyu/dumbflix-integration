package filmdto

type FilmResponse struct {
	ID            int    `json:"id"`
	Title         string `json:"title"`
	Slug          string `json:"slug"`
	ThumbnailFilm string `json:"thumbnail_film"`
	Description   string `json:"description"`
	Year          string `json:"year"`
	Category      string `json:"category"`
	UserId        int    `json:"user_id"`
	LinkFilm      string `json:"link_film"`
}