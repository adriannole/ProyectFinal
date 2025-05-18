// src/pages/RoleSelection.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};

  const handleSelect = (role) => {
    if (!userId) {
      alert("Usuario no verificado.");
      return;
    }

    if (role === "freelancer") {
      navigate("/register-freelancer", { state: { userId } });
    } else if (role === "empresa") {
      navigate("/register-company", { state: { userId } });
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>¿Cómo deseas continuar?</h2>
      <button onClick={() => handleSelect("freelancer")}>Ingresar como Freelancer</button>
      <button onClick={() => handleSelect("empresa")}>Ingresar como Empresa</button>
    </div>
  );
};

export default RoleSelection;
