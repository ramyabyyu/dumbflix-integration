import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceErrorMessage } from "../../helpers/serviceErrorMessage";
import filmService from "./filmService";

const initialState = {
  films: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add Film
export const createFilm = createAsyncThunk(
  "film/create",
  async (filmData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await filmService.createFilm(filmData, token);
    } catch (error) {
      serviceErrorMessage(error, thunkAPI);
    }
  }
);

// Get Films
export const getFilms = createAsyncThunk("film/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await filmService.getFilms(token);
  } catch (error) {
    serviceErrorMessage(error, thunkAPI);
  }
});

export const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.films.push(action.payload);
      })
      .addCase(createFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = filmSlice.actions;
export default filmSlice.reducer;
