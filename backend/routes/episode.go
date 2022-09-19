package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middlewares"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gorilla/mux"
)

func EpisodeRoutes(r *mux.Router) {
	episodeRepository := repositories.RepositoryEpisode(mysql.DB)
	h := handlers.HandlerEpisode(episodeRepository)

	r.HandleFunc("/episodes", h.FindEpisodes).Methods("GET")
	r.HandleFunc("/episode", middlewares.Auth(middlewares.IsAdmin(h.CreateEpisode))).Methods("POST")
}