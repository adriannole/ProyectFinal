import React, { useState } from "react";
import axios from "axios";

const TraceForm = ({ userId, onRecordSaved }) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, user_id: userId };
      await axios.post("http://localhost:8000/api/trace", payload);
      onRecordSaved(); // Refrescar lista
      setFormData({ company: "", position: "", start_date: "", end_date: "" });
    } catch (err) {
      console.error("Error al guardar trazabilidad", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Trazabilidad Laboral</h2>
      <input name="company" value={formData.company} onChange={handleChange} placeholder="Empresa" required />
      <input name="position" value={formData.position} onChange={handleChange} placeholder="Cargo" required />
      <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
      <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );        
};

export default TraceForm;
