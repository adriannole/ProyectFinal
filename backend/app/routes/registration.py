from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import database
from app.models import freelancers, companies
router = APIRouter()

class FreelancerIn(BaseModel):
    user_id: str
    name: str
    birth_year: int  # 👈 actualizado
    phone: str
    experience: str
    skills: str
    sector: str

@router.post("/freelancers")
async def create_freelancer(data: FreelancerIn):
    query = freelancers.insert().values(**data.dict())
    try:
        await database.execute(query)
        return {"message": "Freelancer registrado con éxito"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class CompanyIn(BaseModel):
    name: str
    type: str
    area: str
    projects: str

@router.post("/companies")
async def create_company(data: CompanyIn):
    query = companies.insert().values(**data.dict())
    try:
        await database.execute(query)
        return {"message": "Empresa registrada con éxito"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
