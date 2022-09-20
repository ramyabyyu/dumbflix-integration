import { API } from "../../config/api";

const auth = async (userData, isRegister) => {
  let response;

  if (isRegister) {
    response = await API.post("/register", userData);
  } else {
    response = await API.post("/login", userData);
  }

  if (response.data) {
    const user = JSON.stringify(response.data.data);
    localStorage.setItem("user", user);
  }

  return response.data.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  auth,
  logout,
};

export default authService;
