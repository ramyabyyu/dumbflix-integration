import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceErrorMessage } from "../../helpers/serviceErrorMessage";
import transactionService from "./transactionService";

const initialState = {
  transactions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getTransactions = createAsyncThunk(
  "transaction/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transactionService.getTransactions(token);
    } catch (error) {
      serviceErrorMessage(error);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // get transaction
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
