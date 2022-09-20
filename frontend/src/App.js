import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import * as AuthTypes from "./types/auth";
import AddFilm from "./pages/Admin/AddFilm";
import Transactions from "./pages/Admin/Transactions";
import AllMovies from "./pages/AllMovies";

// init token on axios everytime the app refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  const token = localStorage.getItem("token");

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: AuthTypes.AUTH_SUCCESS,
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [state]);

  return (
    <>
      <Header />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Profile Page */}
        <Route path="profile" element={<Profile />} />

        {/* Admin */}

        {/* Add Film */}
        <Route path="add-film" element={<AddFilm />} />

        {/* Transaction */}
        <Route path="transaction" element={<Transactions />} />

        {/* Show All Movies */}
        <Route path="all-movies" element={<AllMovies />} />
      </Routes>
    </>
  );
};

export default App;
