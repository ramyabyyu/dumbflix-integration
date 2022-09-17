package handlers

import (
	profiledto "dumbflix/dto/profile"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
)

type handlerProfile struct {
	ProfileRepository repositories.ProfileRepository
}

func HandlerProfile(ProfileRepository repositories.ProfileRepository) *handlerProfile {
	return &handlerProfile{ProfileRepository}
}

func (h *handlerProfile) GetProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// id, _ := strconv.Atoi(mux.Vars(r)["id"])

	// Get User ID
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	fmt.Println(userInfo)
	fmt.Println(userId)

	var profile models.Profile
	profile, err := h.ProfileRepository.GetProfile(userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	profileResponse := profiledto.ProfileResponse{
		ID: profile.ID,
		FullName: profile.FullName,
		Gender: profile.Gender,
		Photo: profile.Photo,
		Phone: profile.Phone,
		Address: profile.Address,
		UserID: userId,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: profileResponse}
	json.NewEncoder(w).Encode(response)
}