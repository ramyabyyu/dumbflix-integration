package handlers

import (
	dto "dumbflix/dto/result"
	transactionsdto "dumbflix/dto/transaction"
	"dumbflix/models"
	"dumbflix/repositories"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"os"
	"strconv"
	"time"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"

	"gopkg.in/gomail.v2"
)

var c = coreapi.Client{
	ServerKey: os.Getenv("SERVER_KEY"),
	ClientKey:  os.Getenv("CLIENT_KEY"),
  }

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) FindTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	filePath := os.Getenv("PATH_FILE")

	transactionResponse := make([]transactionsdto.TransactionResponse, 0)
	for _, transaction := range transactions {
		transactionResponse = append(transactionResponse, transactionsdto.TransactionResponse{
			ID: transaction.ID,
			StartDate: transaction.StartDate,
			DueDate: transaction.DueDate,
			Attache: filePath + transaction.Attache,
			Status: transaction.Status,
		})
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: transactionResponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userId, _ := strconv.Atoi(r.FormValue("user_id"))
	request := transactionsdto.TransactionRequest{
		UserID: int(userId),
		User: models.UserTransaction{
			Email: r.FormValue("email"),
		},
	}

	// Get file name
	// dataContext := r.Context().Value("dataFile")
	// filename := dataContext.(string)

	// request := transactionsdto.TransactionRequest{
	// 	Attache: r.FormValue("file"),
	// }

	var TransIdIsMatch = false
	var TransactionId int
	for !TransIdIsMatch {
		TransactionId = int(time.Now().Unix()) * 2
		transactionData, _ := h.TransactionRepository.GetTransaction(TransactionId)
		if transactionData.ID == 0 {
			TransIdIsMatch = true
		}
	}

	// validation := validator.New()
	// err := validation.Struct(request)
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	// Get User Id
	// userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	// userId := int(userInfo["id"].(float64))

	startDate := time.Now()
	dueDate := startDate.Add((time.Hour * 24) * 30) // Duration = 30 days

	transaction := models.Transaction{
		ID: TransactionId,
		StartDate: startDate,
		DueDate:   dueDate,
		Attache:   "-",
		Price: 30000,
		Status:    "Pending",
		UserID:    request.UserID,
	}

	data, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	dataTransaction, err := h.TransactionRepository.GetTransaction(data.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(data.ID),
			GrossAmt: int64(data.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataTransaction.User.Profile.FullName,
			Email: dataTransaction.User.Email,
		},
	}
	// fmt.Println(req)

	// 3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: snapResp}
	json.NewEncoder(w).Encode(response)
}

func SendMail(status string, transaction models.Transaction) {

	fmt.Println("test sendmail")

	if status != transaction.Status && (status == "success") {
	  var CONFIG_SMTP_HOST = "smtp.gmail.com"
	  var CONFIG_SMTP_PORT = 587
	  var CONFIG_SENDER_NAME = "Dumbflix <ramyabyyu907@gmail.com>"
	  var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
	  var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")
  
	  var name = transaction.User.Profile.FullName
	  var expire = transaction.DueDate
	  var price = strconv.Itoa(transaction.Price)
  
	  mailer := gomail.NewMessage()
	  mailer.SetHeader("From", CONFIG_SENDER_NAME)
	  mailer.SetHeader("To", transaction.User.Email)
	  mailer.SetHeader("Subject", "Transaction Status")
	  mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
		<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
		  h1 {
		  color: brown;
		  }
		</style>
		</head>
		<body>
		<h2>Product payment :</h2>
		<ul style="list-style-type:none;">
		  <li>Name : %s</li>
		  <li>Total payment: Rp.%s</li>
		  <li>Expire: Rp.%s</li>
		  <li>Status : <b>%s</b></li>
		</ul>
		</body>
	  </html>`, name, price, expire, status))
  
	  dialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	  )
  
	  err := dialer.DialAndSend(mailer)
	  if err != nil {
		log.Fatal(err.Error())
	  }
  
	  log.Println("Mail sent! to " + transaction.User.Email)
	}
  }

func (h *handlerTransaction) Notification(w http.ResponseWriter, r *http.Request) {
	var notificationPayload map[string]interface{}

	fmt.Println("Text Notification 1")

	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	fmt.Println("Text Notification 2")


	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	transaction, _ := h.TransactionRepository.GetOneTransaction(orderId)

	fmt.Println("Text Notification 3")

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
      		// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			h.TransactionRepository.UpdateTransaction("pending", orderId)
		} else if fraudStatus == "accept" {
			// TODO set transaction status on your database to 'success'
			SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", orderId)
		}
	} else if transactionStatus == "settlement" {
		// TODO set transaction status on your database to 'success'
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", orderId)
	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
    	// and later can become success
		SendMail("failed", transaction)
		h.TransactionRepository.UpdateTransaction("failed", orderId)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		SendMail("failed", transaction)
		h.TransactionRepository.UpdateTransaction("failed", orderId)
	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.TransactionRepository.UpdateTransaction("pending",  orderId)
	}

	w.WriteHeader(http.StatusOK)
}