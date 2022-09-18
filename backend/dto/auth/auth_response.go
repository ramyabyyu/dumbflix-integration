package authdto

type LoginResponse struct {
	ID      int    `json:"id"`
	Email   string `json:"email"`
	Token   string `json:"token"`
	IsAdmin bool   `json:"is_admin"`
	Message string `json:"message"`
}

type RegisterResponse struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	IsAdmin  bool   `json:"is_admin"`
	Token    string `json:"token"`
	FullName string `json:"full_name"`
	Address  string `json:"address"`
	Gender   string `json:"gender"`
	Phone    string `json:"phone"`
	Photo    string `json:"-"`
	IsActive bool   `json:"is_active"`
	Message  string `json:"message"`
}