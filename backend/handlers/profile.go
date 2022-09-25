package handlers

import (
	profiledto "dumbflix/dto/profile"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/go-playground/validator/v10"
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

	// fmt.Println(userInfo)
	// fmt.Println(userId)

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
		Email: profile.User.Email,
		IsAdmin: profile.User.IsAdmin,
		Gender: profile.Gender,
		Photo: profile.Photo,
		IsActive: profile.IsActive,
		Phone: profile.Phone,
		Address: profile.Address,
		UserID: userId,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: profileResponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerProfile) ChangeProfilePhoto(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get User ID by token
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// Get Image File Name
	dataContext := r.Context().Value("dataFile")
	filename := dataContext.(string)

	request := profiledto.ChangeProfilePhotoRequest{
		Photo: r.FormValue("file"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	// Get Profile by user id
	profile, _ := h.ProfileRepository.GetProfile(userId)

	if filename != "false" {
		profile.Photo = filename
	}

	profile, err = h.ProfileRepository.ChangeProfilePhoto(profile)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	filePath := os.Getenv("PATH_FILE")

	fmt.Println(profile)
	changeProfilePhotoResponse := profiledto.ChangeProfilePhotoResponse{
		ID: profile.ID,
		Photo: filePath + profile.Photo,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: changeProfilePhotoResponse}
	json.NewEncoder(w).Encode(response)
}