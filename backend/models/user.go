package models

type User struct {
	ID       int    `json:"id" gorm:"primary_key:auto_increment"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"-" gorm:"type: varchar(255)"`
	IsAdmin  bool   `json:"isAdmin"`
}
