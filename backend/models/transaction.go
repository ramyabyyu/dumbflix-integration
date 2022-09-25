package models

import "time"

type Transaction struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	StartDate time.Time `json:"startdate"`
	DueDate   time.Time `json:"duedate"`
	Attache   string    `json:"attache"`
	Status    string     `json:"status"`
	Price int `json:"price"`
	UserID    int       `json:"user_id" gorm:"type:int"`
	User      User      `json:"user"`
}

type UserTransaction struct {
	Email string `json:"email" form:"email"`
}

func (UserTransaction) TableName() string {
	return "transactions"
}