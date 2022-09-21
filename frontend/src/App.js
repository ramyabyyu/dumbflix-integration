import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import AddFilm from "./pages/Admin/AddFilm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import * as Path from "./routeNames";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.PROFILE} element={<Profile />} />

        {/* Admin Pages */}
        <Route path={Path.ADD_FILM} element={<AddFilm />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
