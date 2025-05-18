import React from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleVerify = async (result) => {
    console.log("📦 handleVerify ejecutado con:", result);
    // Simula una verificación exitosa
    return new Promise((resolve) => resolve());
  };

  const handleSuccess = (result) => {
    console.log("✅ handleSuccess ejecutado con:", result);
    const userId = result.nullifier_hash || "demo_user_id";
    navigate("/select-role", { state: { userId } });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>TraceID - Registro Laboral con World ID</h1>

      <IDKitWidget
        app_id="app_78490a32055aea381ec93f8c09581c60"
        verification_level={VerificationLevel.Device}
        handleVerify={handleVerify}
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <button onClick={open}>Verificar con World ID</button>
        )}
      </IDKitWidget>
    </div>
  );
}

export default Home;
