import { API } from "../../config/api";
import { jsonHeaderConfig } from "../../config/configHeader";

const getTransactions = async (token) => {
  const response = await API.get("/transactions", jsonHeaderConfig(token));
  return response.data.data;
};

const createTransaction = async (token) => {
  const response = await API.post("/transaction", jsonHeaderConfig(token));
  console.log(response);
  return response.data.data;
};

const transactionService = {
  getTransactions,
  createTransaction,
};

export default transactionService;
