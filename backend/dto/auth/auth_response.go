package authdto

type AuthResponse struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	FullName string `json:"full_name"`
	Gender   string `json:"gender"`
	Address  string `json:"address"`
	Phone    string `json:"phone"`
	IsAdmin  bool   `json:"is_admin"`
	IsActive bool   `json:"is_active"`
	Token    string `json:"token"`
	Message  string `json:"message"`
	Photo    string `json:"photo"`
}

type CheckAuthResponse struct {
	Id       int    `gorm:"type: int" json:"id"`
	FullName string `gorm:"type: varchar(255)" json:"name"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
}