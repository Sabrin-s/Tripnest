"""Optional local profile service for TripNest.

Run: pip install -r requirements.txt && uvicorn chroma_service:app --port 8000
The static app works without it; when running, account profiles are persisted in ChromaDB.
"""
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb

app = FastAPI(title="TripNest local profile service")
app.add_middleware(CORSMiddleware, allow_origins=["http://127.0.0.1:8080", "http://localhost:8080"], allow_methods=["*"], allow_headers=["*"])
client = chromadb.PersistentClient(path="./tripnest_chroma")
profiles = client.get_or_create_collection("traveler_profiles")

class Profile(BaseModel):
    name: str
    email: str
    phone: str = ""
    createdAt: str = ""

@app.post("/profile")
def save_profile(profile: Profile):
    profiles.upsert(ids=[profile.email], documents=[f"Traveler {profile.name}. Phone: {profile.phone}"], metadatas=[{"name": profile.name, "updated_at": datetime.utcnow().isoformat()}])
    return {"saved": True, "id": profile.email}

@app.get("/profile/{email}")
def get_profile(email: str):
    return profiles.get(ids=[email], include=["documents", "metadatas"])
