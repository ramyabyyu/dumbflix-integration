package handlers

import (
	filmdto "dumbflix/dto/film"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/pkg/slug"
	"dumbflix/repositories"
	"encoding/json"
	"net/http"
	"os"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
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

	// fmt.Println(films)

	filePath := os.Getenv("PATH_FILE")

	filmResponse := make([]filmdto.FilmResponse, 0)
	for _, film := range films {
		filmResponse = append(filmResponse, filmdto.FilmResponse{
			ID: film.ID,
			Title: film.Title,
			Slug: film.Slug,
			ThumbnailFilm: filePath + film.ThumbnailFilm,
			Description: film.Description,
			Year: film.Year,
			Category: film.Category,
			UserId: film.UserID,
			LinkFilm: film.LinkFilm,
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
		LinkFilm: r.FormValue("link_film"),
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
		LinkFilm: request.LinkFilm,
	}

	film, err = h.FilmRepository.CreateFilm(film)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	filePath := os.Getenv("PATH_FILE")

	filmResponse := filmdto.FilmResponse{
		ID: film.ID,
		Title: film.Title,
		Slug: film.Slug,
		ThumbnailFilm: filePath + film.ThumbnailFilm,
		Description: film.Description,
		Year: film.Year,
		Category: film.Category,
		UserId: userId,
		LinkFilm: film.LinkFilm,
	}

	// fmt.Println("Film", filmResponse)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: filmResponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerFilm) GetFilm(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	slug := mux.Vars(r)["slug"]

	film, err := h.FilmRepository.GetFilm(slug)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	filePath := os.Getenv("PATH_FILE")

	filmResponse := filmdto.FilmResponse{
		ID: film.ID,
		Title: film.Title,
		Slug: film.Slug,
		ThumbnailFilm: filePath + film.ThumbnailFilm,
		Description: film.Description,
		Year: film.Year,
		Category: film.Category,
		UserId: film.User.ID,
		LinkFilm: film.LinkFilm,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: filmResponse}
	json.NewEncoder(w).Encode(response)
}