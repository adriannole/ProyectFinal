import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
WORLD_ID_CLIENT_ID = os.getenv("WORLD_ID_CLIENT_ID")
WORLD_ID_SECRET = os.getenv("WORLD_ID_SECRET")
