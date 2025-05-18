# backend/app/routes/trace.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import insert

from app.models import freelancers, companies
from app.database import database

router = APIRouter()

# ----------------------------
# MODELOS PARA FREELANCERS
# ----------------------------
class FreelancerIn(BaseModel):
    user_id: str
    name: str
    birth_year: int           # ✅ corregido
    phone: str
    experience: str
    skills: str
    sector: str               # ✅ corregido


@router.post("/freelancers")
async def create_freelancer(data: FreelancerIn):
    query = insert(freelancers).values(**data.dict())
    async with database.transaction():
        await database.execute(query)
    return {"status": "ok", "message": "Freelancer creado"}

# ----------------------------
# MODELOS PARA EMPRESAS
# ----------------------------
class CompanyIn(BaseModel):
    user_id: str
    name: str
    type: str
    sector: str
    workers_needed: str
    projects: str

@router.post("/companies")
async def create_company(data: CompanyIn):
    query = insert(companies).values(**data.dict())
    async with database.transaction():
        await database.execute(query)
    return {"status": "ok", "message": "Empresa registrada"}



@router.get("/freelancers/{user_id}")
async def get_freelancer(user_id: str):
    query = freelancers.select().where(freelancers.c.user_id == user_id)
    result = await database.fetch_one(query)
    if not result:
        raise HTTPException(status_code=404, detail="Freelancer no encontrado")
    return result


@router.get("/companies/{user_id}")
async def get_company(user_id: str):
    query = companies.select().where(companies.c.user_id == user_id)
    result = await database.fetch_one(query)
    if not result:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    return result
