package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, ID string) (error)
}

type repositoryTransaction struct {
	db *gorm.DB
}

func RepositoryforTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").First(&transaction, "id=?", ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, ID string) (error) {
	var transaction models.Transaction
	r.db.Preload("User").First(&transaction, ID)

	if status != transaction.Status && status == "success" {
		// var user models.User
		// r.db.First(&user, transaction.User.ID)
		// user.Profile.IsActive = true
		// r.db.Save(&user)
		var profile models.Profile
		r.db.Debug().First(&profile, "user_id=?", transaction.User.ID)
		profile.IsActive = true
		r.db.Save(&profile)

		// fmt.Println("Repo Update Transaction 1")

		// var user models.User
		// r.db.Debug().Preload("Profile").First(&user, transaction.User.ID)
		// fmt.Println("Repo Update Transaction 2")
		// user.Profile.IsActive = true
		// fmt.Println("Repo Update Transaction 3")
		// r.db.Save(&user)
	}

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return err
}