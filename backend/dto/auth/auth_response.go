package authdto

type AuthResponse struct {
	ID      int    `json:"id"`
	Email   string `json:"email"`
	IsAdmin bool   `json:"is_admin"`
	Token   string `json:"token"`
	Message string `json:"message"`
}