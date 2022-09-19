package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middlewares"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := repositories.RepositoryforTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions", middlewares.Auth(middlewares.IsAdmin(h.FindTransactions))).Methods("GET")
	r.HandleFunc("/transaction", middlewares.Auth(h.CreateTransaction)).Methods("POST")
	r.HandleFunc("/transaction-status/{id}", middlewares.Auth(middlewares.IsAdmin(h.UpdateTransaction))).Methods("PATCH")
}