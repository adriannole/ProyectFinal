// src/pages/RegisterCompany.jsx
import React, { useState } from "react";
import axios from "axios";

const RegisterCompany = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    area: "",
    current_projects: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, user_id: userId };
      await axios.post("http://localhost:8000/api/companies", payload);
      alert("Registro de empresa exitoso ✅");
    } catch (err) {
      console.error("Error al registrar empresa", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Registro como Empresa</h2>
      <input name="name" placeholder="Nombre de la empresa" onChange={handleChange} required />
      <input name="type" placeholder="Tipo de empresa" onChange={handleChange} required />
      <input name="area" placeholder="Área principal" onChange={handleChange} required />
      <textarea name="current_projects" placeholder="Proyectos actuales" onChange={handleChange} required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterCompany;