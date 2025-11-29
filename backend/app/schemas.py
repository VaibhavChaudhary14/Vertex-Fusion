# backend/app/schemas.py
from pydantic import BaseModel
from typing import List, Optional, Literal

AttackType = Literal["FDI", "RANSOMWARE", "REVERSE_SHELL", "BRUTE_FORCE", "NONE"]

class NodeRisk(BaseModel):
    node_id: str
    node_type: Optional[str] = None
    risk: float

class SimulationRequest(BaseModel):
    project_id: str
    attack_type: AttackType
    grid_type: str = "IEEE-14"
    # if later you want to send fused CP features:
    cp_features: Optional[dict] = None

class SimulationResult(BaseModel):
    predicted_label: Literal["BENIGN", "MALICIOUS"]
    detection_probability: float
    node_risks: List[NodeRisk]

class SimulationResponse(BaseModel):
    request: SimulationRequest
    result: SimulationResult
