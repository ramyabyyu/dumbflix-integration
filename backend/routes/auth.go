package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middlewares"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	authRepository := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authRepository)

	r.HandleFunc("/register", h.Register).Methods("POST")
	r.HandleFunc("/login", h.Login).Methods("POST")
	r.HandleFunc("/check-auth", middlewares.Auth(h.CheckAuth)).Methods("GET")
}