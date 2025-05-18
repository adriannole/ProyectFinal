import React, { useState } from "react";
import axios from "axios";

const RegisterFreelancer = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    birth_year: "",
    phone: "",
    experience: "",
    skills: "",
    sector: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        birth_year: parseInt(formData.birth_year, 10),  // 👈 Conversión segura
        user_id: userId
      };
      console.log("🚀 Payload enviado:", payload);

      await axios.post("http://localhost:8000/api/freelancers", payload);
      alert("Registro de freelancer exitoso ✅");
    } catch (err) {
      console.error("Error al registrar freelancer", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Registro como Freelancer</h2>
      <input name="name" placeholder="Nombre completo" onChange={handleChange} required />
      <input
        type="number"
        name="birth_year"
        placeholder="Año de nacimiento (ej. 1995)"
        onChange={handleChange}
        required
      />
      <input name="phone" placeholder="Teléfono" onChange={handleChange} required />
      <textarea name="experience" placeholder="Experiencia laboral" onChange={handleChange} required />
      <input name="skills" placeholder="Habilidades (separadas por coma)" onChange={handleChange} required />
      <input name="sector" placeholder="Sector donde resides" onChange={handleChange} required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterFreelancer;
