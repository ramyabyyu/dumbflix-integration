package transactiondto

type TransactionRequest struct {
	Attache string `json:"attache"`
}

type UpdateStatusTransactionRequest struct {
	Status string `json:"status"`
}