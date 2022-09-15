package authdto

type RegisterRequest struct {
	Email    string `json:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" gorm:"type: varchar(255)" validate:"required"`
	FullName string `json:"full_name" gorm:"type: varchar(255)" validate:"required"`
	Gender   string `json:"gender" gorm:"type: varchar(255)" validate:"required"`
	Address  string `json:"address" gorm:"type: varchar(255)" validate:"required"`
	Phone    string `json:"phone" gorm:"type: varchar(255)" validate:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" gorm:"type: varchar(255)" validate:"required"`
}