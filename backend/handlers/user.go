package handlers

import (
	authdto "dumbflix/dto/auth"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"encoding/json"
	"net/http"
)

type handler struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users, err := h.UserRepository.GetAllUsers()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: users}
	json.NewEncoder(w).Encode(response)
}

func convertResponse(u models.User) authdto.RegisterResponse {
	return authdto.RegisterResponse{
		ID: u.ID,
		FullName: u.Profile.FullName,
		Email: u.Email,
		IsAdmin: u.IsAdmin,
		Address: u.Profile.Address,
		Gender: u.Profile.Address,
	}
}