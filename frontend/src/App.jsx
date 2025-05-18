// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelection from "./pages/RoleSelection";
import RegisterFreelancer from "./pages/RegisterFreelancer";
import RegisterCompany from "./pages/RegisterCompany";
import UserHistory from "./pages/UserHistory";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/register-freelancer" element={<RegisterFreelancer />} />
        <Route path="/register-company" element={<RegisterCompany />} />

        <Route path="/user-history" element={<UserHistory />} />


        <Route path="/profile" element={<UserProfile />} />


      </Routes>
    </Router>
  );
}

export default App;
