import { API } from "../../config/api";
import {
  formDataHeaderConfig,
  jsonHeaderConfig,
} from "../../config/configHeader";

const getProfile = async (token) => {
  const response = await API.get("/profile", jsonHeaderConfig(token));
  return response.data.data;
};

const profileService = {
  getProfile,
};

export default profileService;
