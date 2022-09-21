import { API } from "../../config/api";
import { formDataHeaderConfig } from "../../config/configHeader";

const createFilm = async (filmData, token) => {
  const response = await API.post(
    "/film",
    filmData,
    formDataHeaderConfig(token)
  );
  return response.data.data;
};

const getFilms = async (token) => {
  const response = await API.get("/films", formDataHeaderConfig(token));
  return response.data.data;
};

const filmService = {
  createFilm,
  getFilms,
};

export default filmService;
