import axios from "axios";

// create base url API
export const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};
