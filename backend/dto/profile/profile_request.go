package profiledto

import "dumbflix/models"

type UpdateProfileRequest struct {
	FullName string 					`json:"full_name" gorm:"type: varchar(255)"`
	Phone    string 					`json:"phone" gorm:"type: varchar(255)"`
	Gender   string 					`json:"gender" gorm:"type: varchar(255)"`
	Address  string 					`json:"address" gorm:"type: text"`
	UserID   int    					`json:"user_id"`
	User     models.ProfileUserResponse `json:"user"`
}

type ChangeProfilePhotoRequest struct {
	Photo string `json:"photo"`
}