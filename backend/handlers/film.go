package handlers

import (
	filmdto "dumbflix/dto/film"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/pkg/slug"
	"dumbflix/repositories"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)

type handlerFilm struct {
	FilmRepository repositories.FilmRepository
}

func HandlerFilm(FilmRepository repositories.FilmRepository) *handlerFilm {
	return &handlerFilm{FilmRepository}
}

func (h *handlerFilm) FindFilm(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	films, err := h.FilmRepository.FindFilm()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	filmResponse := make([]filmdto.FilmResponse, 0)
	for _, film := range films {
		filmResponse = append(filmResponse, filmdto.FilmResponse{
			ID: film.ID,
			Title: film.Title,
			Slug: film.Slug,
			ThumbnailFilm: film.ThumbnailFilm,
			Description: film.Description,
			Year: film.Year,
			Category: film.Category,
			UserId: film.UserID,
		})
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: filmResponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerFilm) CreateFilm(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get data user token
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// get file name
	dataContext := r.Context().Value("dataFile")
	filename := dataContext.(string)

	request := filmdto.FilmRequest{
		Title: r.FormValue("title"),
		ThumbnailFilm: r.FormValue("file"),
		Description: r.FormValue("description"),
		Year: r.FormValue("year"),
		Category: r.FormValue("category"),
	}

	// request := new(filmdto.FilmRequest)
	// if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}


	title := request.Title

	film := models.Film{
		Title: title,
		ThumbnailFilm: filename,
		Slug: slug.GenerateSlug(title),
		Description: request.Description,
		Year: request.Year,
		Category: request.Category,
		UserID: userId,
	}

	film, err = h.FilmRepository.CreateFilm(film)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	filmResponse := filmdto.FilmResponse{
		ID: film.ID,
		Title: film.Title,
		Slug: film.Slug,
		ThumbnailFilm: "http://localhost:8080/uploads/" + film.ThumbnailFilm,
		Description: film.Description,
		Year: film.Year,
		Category: film.Category,
		UserId: userId,
	}

	fmt.Println("Film", filmResponse)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: filmResponse}
	json.NewEncoder(w).Encode(response)
}