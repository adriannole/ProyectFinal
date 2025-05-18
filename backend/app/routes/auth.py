from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
from app.config import WORLD_ID_CLIENT_ID, WORLD_ID_SECRET

router = APIRouter()

class WorldIDVerification(BaseModel):
    merkle_root: str
    nullifier_hash: str
    proof: list
    credential_type: str
    action: str
    signal: str

@router.post("/verify")
async def verify_world_id(data: WorldIDVerification):
    print("🔒 Datos recibidos del frontend:")
    print(data.dict())

    payload = {
        "merkle_root": data.merkle_root,
        "nullifier_hash": data.nullifier_hash,
        "proof": data.proof,
        "credential_type": data.credential_type,
        "action": data.action,
        "signal": data.signal,
        "client_id": WORLD_ID_CLIENT_ID,
        "client_secret": WORLD_ID_SECRET
    }

    print("📤 Enviando a Worldcoin:", payload)

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://verify.worldcoin.org/api/v1/verify",  # ✅ endpoint correcto
            json=payload
        )

    print("📥 Respuesta de Worldcoin:", response.status_code, response.text)

    if response.status_code != 200:
        print("❌ Error real de Worldcoin:", response.text)
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return {"status": "verified"}
