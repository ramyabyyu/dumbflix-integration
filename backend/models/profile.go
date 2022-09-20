package models

type Profile struct {
	ID       int                 `json:"id" gorm:"primary_key:auto_increment"`
	FullName string              `json:"full_name" gorm:"type: varchar(255)"`
	Gender   string              `json:"gender" gorm:"type: varchar(255)"`
	Address  string              `json:"address"`
	Phone    string              `json:"phone" gorm:"type: varchar(255)"`
	Photo    string              `json:"photo" gorm:"type: varchar(255)"`
	IsActive bool                `json:"is_active"`
	UserID   int                 `json:"user_id"`
	User     ProfileUserResponse `json:"-"`
}

type ProfileUserResponse struct {
	ID      int    `json:"id"`
	Email   string `json:"email"`
	IsAdmin bool   `json:"is_admin"`
}

func (ProfileUserResponse) TableName() string {
	return "profiles"
}