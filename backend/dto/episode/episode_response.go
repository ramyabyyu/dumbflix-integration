package episodedto

type EpisodeResponse struct {
	ID               int    `json:"id"`
	Title            string `json:"title"`
	ThumbnailEpisode string `json:"thumbnail_episode"`
	LinkFilm         string `json:"link_film"`
	FilmId           int    `json:"film_id"`
}