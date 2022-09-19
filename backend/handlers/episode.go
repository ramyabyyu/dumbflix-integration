package handlers

import (
	episodedto "dumbflix/dto/episode"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type handlerEpisode struct {
	EpisodeRepository repositories.EpisodeRepository
}

func HandlerEpisode(EpisodeRepository repositories.EpisodeRepository) *handlerEpisode {
	return &handlerEpisode{EpisodeRepository}
}

func (h *handlerEpisode) FindEpisodes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	episode, err := h.EpisodeRepository.FindEpisodes()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: episode}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerEpisode) CreateEpisode(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(episodedto.EpisodeRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	episode := models.Episode{
		Title: request.Title,
		LinkFilm: request.LinkFilm,
		ThumbnailEpisode: request.ThumbnailEpisode,
		FilmID: request.FilmId,
	}

	data, err := h.EpisodeRepository.CreateEpisode(episode)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		resposnse := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(resposnse)
		return
	}

	episodeResponse := episodedto.EpisodeResponse{
		ID: data.ID,
		Title: data.Title,
		ThumbnailEpisode: data.ThumbnailEpisode,
		LinkFilm: data.LinkFilm,
		FilmId: data.FilmID,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: episodeResponse}
	json.NewEncoder(w).Encode(response)
}