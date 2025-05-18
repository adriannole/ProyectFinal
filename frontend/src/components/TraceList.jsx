import React, { useEffect, useState } from "react";
import axios from "axios";

const TraceList = () => {
  const [records, setRecords] = useState([]);

  const fetchTraces = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/trace");
      setRecords(res.data);
    } catch (err) {
      console.error("Error al cargar historial", err);
    }
  };

  useEffect(() => {
    fetchTraces();
  }, []);

  return (
    <div>
      <h2>Historial Laboral</h2>
      {records.length === 0 ? (
        <p>No hay registros aún.</p>
      ) : (
        <ul>
          {records.map((r) => (
            <li key={r.id}>
              {r.company} | {r.position} | {r.start_date.slice(0, 10)} → {r.end_date?.slice(0, 10) || "Actual"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TraceList;
