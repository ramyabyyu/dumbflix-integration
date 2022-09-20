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
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Profile Page */}
        {/* <Route path="profile" element={<Profile />} /> */}

        {/* Admin */}

        {/* Add Film */}
        {/* <Route path="add-film" element={<AddFilm />} /> */}

        {/* Transaction */}
        {/* <Route path="transaction" element={<Transactions />} /> */}

        {/* Show All Movies */}
        {/* <Route path="all-movies" element={<AllMovies />} /> */}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
