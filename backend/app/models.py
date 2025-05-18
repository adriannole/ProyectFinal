from sqlalchemy import Table, Column, Integer, String, Date, Text, MetaData
from app.database import metadata

freelancers = Table(
    "freelancers",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("birth_year", Integer, nullable=False),  # 👈 reemplazado
    Column("phone", String, nullable=False),
    Column("experience", Text),
    Column("skills", Text),
    Column("sector", String),
    Column("user_id", String, unique=True)
)

companies = Table(
    "companies",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("type", String, nullable=False),
    Column("area", String, nullable=False),
    Column("projects", Text),
    Column("user_id", String, unique=True)
)