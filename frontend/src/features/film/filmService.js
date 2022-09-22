import { API } from "../../config/api";
import {
  formDataHeaderConfig,
  jsonHeaderConfig,
} from "../../config/configHeader";

const createFilm = async (filmData, token) => {
  const response = await API.post(
    "/film",
    filmData,
    formDataHeaderConfig(token)
  );
  return response.data.data;
};

const getFilms = async () => {
  const response = await API.get("/films", jsonHeaderConfig(null));
  console.log(response);
  return response.data.data;
};

const filmService = {
  createFilm,
  getFilms,
};

export default filmService;
