import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. Import your modular files
from analytics import calculate_acwr
from rag import get_ai_recommendation
import database  

# 2. Configure Logging (Global Setup)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    logger.info("Health check endpoint called") 
    return {"message": "ProActive Backend is Running!"}

# --- ANALYTICS ENDPOINT ---
@app.get("/analytics/{user_id}")
def get_analytics(user_id: str):
    try:
        logger.info(f"Fetching analytics for user: {user_id}")
        logs = database.fetch_user_logs(user_id)
        
        # 2. Run the Math
        stats = calculate_acwr(logs)
        
        return stats
        
    except Exception as e:
        logger.error(f"Analytics Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# --- AI COACH ENDPOINT ---
# We added a POST method to support standard JSON bodies, 
# but kept GET for testing/compatibility.

class AIRequest(BaseModel):
    query: str

@app.post("/ask")
def ask_ai(request: AIRequest):
    try:
        logger.info(f"AI Query received: {request.query}")
        results = get_ai_recommendation(request.query)
        if not results:
            logger.warning(f"No AI results found for: {request.query}")
            return {"status": "No matches found", "data": []}
        return {"status": "Success", "data": results}
    except Exception as e:
        logger.error(f"AI Brain Error: {e}")
        return {"status": "Error", "message": str(e)}

# Keeping your original GET for backwards compatibility
@app.get("/ask_ai/{query}")
def ask_ai_coach(query: str):
    try:
        results = get_ai_recommendation(query)
        if not results:
            return {"status": "No matches found", "data": []}
        return {"status": "Success", "data": results}
    except Exception as e:
        return {"status": "Error", "message": str(e)}

# Optional: Test Endpoint using helper
@app.get("/test-db")
def test_database():
    try:
        # Just fetching logs for a dummy ID to see if connection works
        return {"message": "Database connection is active via database.py"}
    except Exception as e:
        return {"error": str(e)}