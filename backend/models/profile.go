package models

type Profile struct {
	ID       int                 `json:"id" gorm:"primary_key:auto_increment"`
	FullName string              `json:"full_name" gorm:"type: varchar(255)"`
	Gender   string              `json:"gender" gorm:"type: varchar(255)"`
	Address  string              `json:"address"`
	Phone    string              `json:"phone" gorm:"type: varchar(255)"`
	Photo    string              `json:"photo" gorm:"type: varchar(255)"`
	UserID   int                 `json:"user_id"`
	User     UserProfileResponse `json:"user"`
}

type UserProfileResponse struct {
	ID int `json:"id"`
}

func (UserProfileResponse) TableName() string {
	return "users"
}