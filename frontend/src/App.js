import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Page */}
        <Route path="auth" element={<Auth />} />

        {/* Profile Page */}
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
