import { API } from "../../config/api";

const auth = async (userData, isRegister) => {
  let response;

  if (isRegister) {
    response = await API.post("/register", userData);
  } else {
    response = await API.post("/login", userData);
  }

  if (response.data) {
    localStorage.setItem("token", response.data.data.token);
  }

  return response.data.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  auth,
  logout,
};

export default authService;
