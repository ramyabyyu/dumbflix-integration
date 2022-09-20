package models

import "time"

type User struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	Email     string    `json:"email" gorm:"type: varchar(255)"`
	Password  string    `json:"-" gorm:"type: varchar(255)"`
	IsAdmin   bool      `json:"is_admin"`
	Profile   Profile   `json:"profile"`
	Films 	[]Film `json:"films"`
	Transactions []Transaction `json:"transactions"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}