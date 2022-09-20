import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";

const App = () => {
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
