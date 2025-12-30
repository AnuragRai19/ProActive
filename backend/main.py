from rag import get_ai_recommendation
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import supabase
from analytics import calculate_acwr  # <--- NEW IMPORT

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
    return {"message": "ProActive Backend is Running!"}

# Endpoint for Raw Data (Testing)
@app.get("/test-db")
def test_database():
    try:
        response = supabase.table("workout_logs").select("*").limit(5).execute()
        return {"data": response.data}
    except Exception as e:
        return {"error": str(e)}

# --- NEW: Analytics Endpoint ---
@app.get("/analytics/{user_id}")
def get_analytics(user_id: str):
    try:
        # 1. Fetch ALL logs for this user (Last 28 days)
        # In a real app, we would filter by date in the SQL query for speed.
        response = supabase.table("workout_logs").select("*").eq("user_id", user_id).execute()
        
        # 2. Run the Math
        stats = calculate_acwr(response.data)
        
        return stats
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# --- AI Coach Endpoint ---
@app.get("/ask_ai/{query}")
def ask_ai_coach(query: str):
    try:
        results = get_ai_recommendation(query)
        
        # If no results (unlikely), return a safe message
        if not results:
            return {"status": "No matches found", "data": []}
            
        return {"status": "Success", "data": results}
    except Exception as e:
        return {"status": "Error", "message": str(e)}