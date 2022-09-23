package models

import "time"

type Transaction struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	StartDate time.Time `json:"startdate"`
	DueDate   time.Time `json:"duedate"`
	Attache   string    `json:"attache"`
	Status    string     `json:"status"`
	UserID    int       `json:"user_id" gorm:"type:int"`
	User      User      `json:"-"`
}

type UserTransaction struct {
	StartDate time.Time `json:"startdate"`
	DueDate   time.Time `json:"duedate"`
	Duration   time.Duration `json:"duration"`
	Attache   string    `json:"attache"`
	Status    string      `json:"status"`
}

func (UserTransaction) TableName() string {
	return "transactions"
}