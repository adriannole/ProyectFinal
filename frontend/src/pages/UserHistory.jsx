import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UserHistory = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [freelancerData, setFreelancerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8000/api/freelancers/${userId}`)
        .then(res => setFreelancerData(res.data))
        .catch(err => setError("No se encontró historial del usuario."));
    }
  }, [userId]);

  if (!userId) return <p>Error: No se encontró ID de usuario.</p>;
  if (error) return <p>{error}</p>;
  if (!freelancerData) return <p>Cargando historial...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Historial de Usuario (Freelancer)</h2>
      <p><strong>Nombre:</strong> {freelancerData.name}</p>
      <p><strong>Año de nacimiento:</strong> {freelancerData.birth_year}</p>
      <p><strong>Teléfono:</strong> {freelancerData.phone}</p>
      <p><strong>Experiencia:</strong> {freelancerData.experience}</p>
      <p><strong>Habilidades:</strong> {freelancerData.skills}</p>
      <p><strong>Sector:</strong> {freelancerData.sector}</p>
    </div>
  );
};

export default UserHistory;
