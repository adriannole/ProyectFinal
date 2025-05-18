import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const location = useLocation();
  const { userId, role } = location.state || {};
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !role) return;

    const endpoint = role === "freelancer"
      ? `http://localhost:8000/api/freelancers/${userId}`
      : `http://localhost:8000/api/companies/${userId}`;

    axios.get(endpoint)
      .then(res => setData(res.data))
      .catch(() => setError("No se pudo cargar el perfil."));
  }, [userId, role]);

  if (!userId || !role) return <p>Error: Información incompleta</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Cargando perfil...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Perfil de {role === "freelancer" ? "Freelancer" : "Empresa"}</h2>
      {Object.entries(data).map(([key, value]) => (
        <p key={key}><strong>{key.replace(/_/g, " ")}:</strong> {value}</p>
      ))}
    </div>
  );
};

export default UserProfile;
