package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middlewares"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gorilla/mux"
)

func FilmRoutes(r *mux.Router) {
	filmRepository := repositories.RepositoryFilm(mysql.DB)
	h := handlers.HandlerFilm(filmRepository)

	r.HandleFunc("/films", h.FindFilm).Methods("GET")
	r.HandleFunc("/film", middlewares.Auth(middlewares.IsAdmin(middlewares.UploadFile(h.CreateFilm)))).Methods("POST")
	r.HandleFunc("/film/{slug}", middlewares.Auth(middlewares.IsActive(h.GetFilm))).Methods("GET")
}