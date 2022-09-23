import { API } from "../../config/api";
import { jsonHeaderConfig } from "../../config/configHeader";

const getTransactions = async (token) => {
  const response = await API.get("/transactions", jsonHeaderConfig(token));
  return response.data.data;
};

const transactionService = {
  getTransactions,
};

export default transactionService;
