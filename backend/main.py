from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from data_service import data_service
from stewards_agent import stewards_agent
from simulator import simulator
from telemetry_agent import telemetry_agent
from radio_agent import radio_agent
from kg_orchestrator import kg_orchestrator
from pydantic import BaseModel
from typing import List, Dict, Any
import datetime

# ── Request Models ────────────────────────────────────────────────────────────

class IncidentRequest(BaseModel):
    description: str

class SimulationRequest(BaseModel):
    session_id: str
    change_params: Dict[str, Any]

class RadioMessage(BaseModel):
    speaker: str       # "Driver" or "Engineer"
    message: str
    lap: int = 0

class RadioAnalysisRequest(BaseModel):
    driver: str
    transcripts: List[RadioMessage]
    context: str = ""

class PPIRequest(BaseModel):
    driver: str
    championship_gap: int
    laps_remaining: int
    rival_gap_seconds: float

class KGQueryRequest(BaseModel):
    question: str

# ── App & CORS ─────────────────────────────────────────────────────────────────

app = FastAPI(title="GridSense API", description="AI-powered F1 Intelligence Graph")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Health ─────────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"message": "Welcome to GridSense API", "status": "operational", "agents": 5}

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "agents": ["stewards", "simulator", "telemetry", "radio", "kg_orchestrator"],
    }

# ── Data endpoints ─────────────────────────────────────────────────────────────

@app.get("/session/{year}/{location}/{session_type}/results")
async def get_results(year: int, location: str, session_type: str):
    try:
        session = data_service.get_session(year, location, session_type)
        results = data_service.get_session_results(session)
        return {"year": year, "location": location, "session": session_type, "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/session/{year}/{location}/{session_type}/laps")
async def get_laps(year: int, location: str, session_type: str):
    try:
        session = data_service.get_session(year, location, session_type)
        laps = data_service.get_lap_data(session)
        return {"year": year, "location": location, "session": session_type, "laps": laps}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── Agent endpoints ────────────────────────────────────────────────────────────

@app.post("/analyze-incident")
async def analyze_incident(request: IncidentRequest):
    """Agent 2: Rules & Regulations — steward decision with FIA rule references."""
    try:
        return stewards_agent.analyze_incident(request.description)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/simulate-what-if")
async def simulate_what_if(request: SimulationRequest):
    """Agent 3: Strategy & Counterfactual — alternate pit/strategy scenario."""
    try:
        return simulator.simulate_what_if(request.session_id, request.change_params)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/telemetry-analysis/{year}/{location}/{session_type}/{driver}")
async def get_telemetry_analysis(year: int, location: str, session_type: str, driver: str):
    """Agent 1: Telemetry Reasoning — FastF1 data + Sarvam AI performance analysis."""
    try:
        return telemetry_agent.analyze_driver_performance(year, location, session_type, driver)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-radio")
async def analyze_radio(request: RadioAnalysisRequest):
    """Agent 4: Radio & Psychology — sentiment/PPI from team radio transcripts."""
    try:
        transcripts = [t.model_dump() for t in request.transcripts]
        return radio_agent.analyze_radio(transcripts, request.driver, request.context)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/psychological-pressure-index")
async def psychological_pressure_index(request: PPIRequest):
    """Agent 4b: Compute PPI from race context (no radio needed)."""
    try:
        return radio_agent.psychological_pressure_index(
            request.driver, request.championship_gap,
            request.laps_remaining, request.rival_gap_seconds
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/kg-query")
async def kg_query(request: KGQueryRequest):
    """Agent 5: Knowledge Graph Orchestrator — multi-hop natural language query."""
    try:
        return kg_orchestrator.answer_query(request.question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/kg-summary")
async def kg_summary():
    """Return KG node/edge counts and type breakdown."""
    return kg_orchestrator.get_summary()

# ── Run ────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
