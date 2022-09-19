package profiledto

type ProfileResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	IsAdmin  bool   `json:"is_admin"`
	Phone    string `json:"phone"`
	Photo    string `json:"photo"`
	IsActive bool   `json:"is_active"`
	Gender   string `json:"gender"`
	Address  string `json:"address"`
	UserID   int    `json:"user_id"`
}

type ChangeProfilePhotoResponse struct {
	ID    int    `json:"id"`
	Photo string `json:"photo"`
}