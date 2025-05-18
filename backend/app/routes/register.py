from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import insert
from app.database import database, freelancers, companies
from datetime import date

router = APIRouter()

# 🎯 Modelos Pydantic para validación
class FreelancerIn(BaseModel):
    user_id: str
    name: str
    birth_year: int  # 👈 actualizado
    phone: str
    experience: str
    skills: str
    sector: str
    
    
class CompanyIn(BaseModel):
    user_id: str
    name: str
    type: str
    area: str
    current_projects: str

# 🧑 Registro de Freelancer
@router.post("/freelancers")
async def register_freelancer(data: FreelancerIn):
    query = insert(freelancers).values(**data.dict())
    try:
        await database.execute(query)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 🏢 Registro de Empresa
@router.post("/companies")
async def register_company(data: CompanyIn):
    query = insert(companies).values(**data.dict())
    try:
        await database.execute(query)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
