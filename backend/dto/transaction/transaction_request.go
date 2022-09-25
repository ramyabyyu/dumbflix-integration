package transactiondto

import "dumbflix/models"

type TransactionRequest struct {
	UserID int `json:"user_id" form:"user_id"`
	User   models.UserTransaction `json:"user"`
}

type UpdateStatusTransactionRequest struct {
	Status string `json:"status"`
}