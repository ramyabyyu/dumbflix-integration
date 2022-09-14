package main

import (
	"dumbflix/database"
	"dumbflix/pkg/mysql"
	"dumbflix/routes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {

	// Database Init
	mysql.DatabaseInit()

	// Run Migration
	database.RunMigration()

	// Initialize Mux Router
	r := mux.NewRouter()

	// routes
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode("Hello World")
	})

	routes.RoutesInit(r.PathPrefix("/api/v1").Subrouter())

	// Config CORS
	var allowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var allowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PATCH", "DELETE", "PUT", "HEAD"})
	var allowedOrigins = handlers.AllowedOrigins([]string{"*"})

	var port = "8080"

	fmt.Println("Starting API server localhost:"+port)
	http.ListenAndServe("localhost:8080", handlers.CORS(allowedHeaders, allowedMethods, allowedOrigins)(r))
}