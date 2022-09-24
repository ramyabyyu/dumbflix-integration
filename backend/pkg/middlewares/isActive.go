package middlewares

import (
	"encoding/json"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
)

func IsActive(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
		// fmt.Println(userInfo)
		userStatus := userInfo["isActive"]

		if userStatus != true {
			w.WriteHeader(http.StatusUnauthorized)
			response := Result{Code: http.StatusUnauthorized, Message: "You have to subscribe in order to watch a movie :)"}
			json.NewEncoder(w).Encode(response)
			return
		}

		next.ServeHTTP(w, r)
	})
}