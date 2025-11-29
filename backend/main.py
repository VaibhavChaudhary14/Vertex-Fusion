# backend/main.py
import logging
from contextlib import asynccontextmanager
from typing import Optional, List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.schemas import SimulationRequest, SimulationResponse
from app.inference import InferenceEngine

logger = logging.getLogger("vertex_fusion_backend")
logging.basicConfig(level=settings.LOG_LEVEL.upper())

inference_engine: Optional[InferenceEngine] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global inference_engine
    try:
        logger.info("Starting Vertex Fusion GNN backend...")
        logger.info("Loading model from %s", settings.MODEL_PATH)
        inference_engine = InferenceEngine(model_path=settings.MODEL_PATH)
        logger.info("Model loaded successfully")
        yield
    finally:
        logger.info("Shutting down Vertex Fusion backend...")
        # If you had any resources to close, do it here

app = FastAPI(
    title="Vertex Fusion GNN Backend",
    version="0.1.0",
    lifespan=lifespan,
)

# --- CORS ---

# If CORS_ORIGINS env is empty, allow all (dev).
# In production, set CORS_ORIGINS=["https://your-vercel-domain.vercel.app"]
if settings.CORS_ORIGINS:
    origins: List[str] = [str(o) for o in settings.CORS_ORIGINS]
else:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Health endpoints ---

@app.get("/health")
async def health():
    return {"status": "ok", "env": settings.ENVIRONMENT}

@app.get("/ready")
async def ready():
    if inference_engine is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "ready"}

# --- Simulation endpoint ---

@app.post("/simulate", response_model=SimulationResponse)
async def simulate(req: SimulationRequest):
    if inference_engine is None:
        raise HTTPException(status_code=503, detail="Inference engine not ready")

    try:
        result = inference_engine.run_simulation(req)
        return SimulationResponse(request=req, result=result)
    except Exception as e:
        logger.exception("Error during simulation")
        raise HTTPException(status_code=500, detail=str(e))


# Optional root
@app.get("/")
async def root():
    return {
        "service": "vertex-fusion-gnn-backend",
        "version": "0.1.0",
    }
