package handlers

import (
	authdto "dumbflix/dto/auth"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/pkg/bcrypt"
	jwtToken "dumbflix/pkg/jwt"
	"dumbflix/repositories"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get Request
	request := new(authdto.RegisterRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Validate Request
	validation := validator.New()
	if err := validation.Struct(request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Hashing Password
	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// GetAllUsers, if record user is still empty, then user role is admin, else user role is not admin
	users, err := h.AuthRepository.GetAllUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var isAdmin bool
	var isActive bool
	if len(users) == 0 {
		isAdmin = true
		isActive = true
	} else {
		isAdmin = false
		isActive = false
	}

	user := models.User {
		Email: request.Email,
		Password: password,
		IsAdmin: isAdmin,
		Profile: models.Profile{
			FullName: request.FullName,
			Gender: request.Gender,
			Address: request.Address,
			Phone: request.Phone,
			Photo: "-",
			IsActive: isActive,
		},
	}

	// Check if email exist
	err = h.AuthRepository.CheckEmailExist(request.Email)

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Email already exist"}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.AuthRepository.Register(user)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Generate Token
	claims := jwt.MapClaims{}
	claims["id"] = data.ID
	claims["isAdmin"] = data.IsAdmin
	claims["isActive"] = data.Profile.IsActive
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix() // 2 hours expired

	fmt.Println(claims)

	// fmt.Println(data.ID)

	token, err := jwtToken.GenerateToken(&claims)
	if err != nil {
		log.Println(err)
		fmt.Println("Unauthorized")
		return
	}

	registerResponse := authdto.AuthResponse{
		ID: data.ID,
		Email: data.Email,
		IsAdmin: data.IsAdmin,
		Token: token,
		Photo: data.Profile.Photo,
		Message: "Register Success",
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: registerResponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerAuth) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(authdto.LoginRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := models.User{
		Email: request.Email,
		Password: request.Password,
	}

	// Check Email
	data, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Get Old User Password
	// oldPassword, _ := h.AuthRepository.GetUserPassword(user.Email)
	// fmt.Println("request.Password:", request.Password)
	// fmt.Println("oldpassword:",oldPassword)
	// Check Password

	isValid := bcrypt.CheckPasswordHash(request.Password, data.Password)
	if !isValid {
		w.WriteHeader(http.StatusBadRequest)
		
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Incorrect password or email!"}
		json.NewEncoder(w).Encode(response)
		return
	}

	

	// generate token
	claims := jwt.MapClaims{}
	claims["id"] = data.ID
	claims["isAdmin"] = data.IsAdmin
	claims["isActive"] = data.Profile.IsActive
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix() // 2 hours expired

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorized")
		return
	}

	loginResponse := authdto.AuthResponse{
		ID: data.ID,
		Email: data.Email,
		IsAdmin: data.IsAdmin,
		Token: token,
		Photo: data.Profile.Photo,
		Message: "Login Success",
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: loginResponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerAuth) CheckAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// Check User by Id
	user, err := h.AuthRepository.Getuser(userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	CheckAuthResponse := authdto.CheckAuthResponse{
		Id:       user.ID,
		FullName:     user.Profile.FullName,
		Email:    user.Email,
	}

	w.Header().Set("Content-Type", "application/json")
	response := dto.SuccessResult{Code: http.StatusOK, Data: CheckAuthResponse}
	json.NewEncoder(w).Encode(response)
}