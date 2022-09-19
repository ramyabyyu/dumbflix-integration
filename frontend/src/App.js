import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

// init token on axios everytime the app refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const token = localStorage.getItem("token");

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
      </Routes>
    </>
  );
};

export default App;
