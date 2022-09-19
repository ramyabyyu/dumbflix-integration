package transactiondto

import "time"

type TransactionResponse struct {
	StartDate time.Time `json:"startdate"`
	DueDate   time.Time `json:"duedate"`
	Attache   string    `json:"attache"`
	Status    string    `json:"status"`
}

type UpdateStatusTransactionResponse struct {
	Status string `json:"status"`
}