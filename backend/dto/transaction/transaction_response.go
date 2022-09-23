package transactiondto

import "time"

type TransactionResponse struct {
	ID int `json:"id"`
	StartDate time.Time `json:"startdate"`
	DueDate   time.Time `json:"duedate"`
	Attache   string    `json:"attache"`
	Status    string    `json:"status"`
}

type UpdateStatusTransactionResponse struct {
	Status string `json:"status"`
}