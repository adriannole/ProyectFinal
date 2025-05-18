from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, trace, registration
from app.database import database  # 👈 agrega esto

app = FastAPI(title="TraceID")

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Conexión a la base de datos
@app.on_event("startup")
async def startup():
    await database.connect()  # 👈 aquí se conecta

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()  # 👈 aquí se desconecta

# ✅ Rutas
app.include_router(auth.router, prefix="/api/auth")
app.include_router(trace.router, prefix="/api")
app.include_router(registration.router, prefix="/api/registration")
