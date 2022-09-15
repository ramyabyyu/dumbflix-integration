package authdto

type LoginResponse struct {
	Email   string `json:"email"`
	Token   string `json:"token"`
	IsAdmin bool   `json:"is_admin"`
}

type RegisterResponse struct {
	ID      int    `json:"id"`
	Email   string `json:"email"`
	IsAdmin bool   `json:"is_admin"`
	// Token     	string 		`json:"token"`
	FullName string `json:"full_name"`
	Address  string `json:"address"`
	Gender   string `json:"gender"`
	Phone    string `json:"phone"`
}