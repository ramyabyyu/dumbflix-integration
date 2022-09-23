import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import filmSlice from "../features/film/filmSlice";
import transactionSlice from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    film: filmSlice,
    transaction: transactionSlice,
  },
});
