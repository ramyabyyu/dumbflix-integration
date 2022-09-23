import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import AddFilm from "./pages/Admin/AddFilm";
import Transactions from "./pages/Admin/Transactions";
import AllMovies from "./pages/AllMovies";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Profile from "./pages/Profile";
import Subscibe from "./pages/Subscibe";

import * as Path from "./routeNames";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.PROFILE} element={<Profile />} />
        <Route path={Path.ADD_FILM} element={<AddFilm />} />
        <Route path={Path.ALL_MOVIES} element={<AllMovies />} />
        <Route path={`${Path.MOVIE_DETAIL}/:slug`} element={<MovieDetail />} />
        <Route path={Path.TRANSACTIONS} element={<Transactions />} />
        <Route path={Path.SUBSCRIBE} element={<Subscibe />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
