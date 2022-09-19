package routes

import "github.com/gorilla/mux"

func RoutesInit(r *mux.Router) {
	UserRoutes(r)
	AuthRoutes(r)
	ProfileRoutes(r)
	FilmRoutes(r)
	EpisodeRoutes(r)
	TransactionRoutes(r)
}