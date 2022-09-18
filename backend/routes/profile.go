package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middlewares"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gorilla/mux"
)

func ProfileRoutes(r *mux.Router) {
	profileRepository := repositories.RepositoryProfile(mysql.DB)
	h := handlers.HandlerProfile(profileRepository)

	r.HandleFunc("/profile", middlewares.Auth(h.GetProfile)).Methods("GET")
	r.HandleFunc("/profile", middlewares.Auth(middlewares.UploadFile(h.ChangeProfilePhoto))).Methods("PATCH")
}