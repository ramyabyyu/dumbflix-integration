import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import filmReducer from "../features/film/filmSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    film: filmReducer,
  },
});
