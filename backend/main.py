import logging
import os
import uvicorn
from fastapi import FastAPI, HTTPException, Request, Depends # Added Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from analytics import calculate_acwr
from rag import get_ai_recommendation
from gemini_service import GeminiCoach 
import database  

# 1. Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI()
coach = GeminiCoach() 

# 2. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def get_authenticated_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        logger.warning("Attempted access without valid Authorization header")
        raise HTTPException(status_code=401, detail="Unauthorized: Missing Token")
    
    token = auth_header.split(" ")[1]
    try:
        # Calls Supabase to verify the token is valid
        user = database.supabase.auth.get_user(token)
        return user.user.id
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid or expired session")

class AIRequest(BaseModel):
    query: str

@app.get("/")
def read_root():
    return {"message": "ProActive Backend is Online - Gemini 2.5 Flash Active"}


@app.get("/api/coach/analyze/{user_id}")
async def get_ai_coach_analysis(user_id: str, token_id: str = Depends(get_authenticated_user)):
    # 🔒 Security: Check if token owner matches the requested user_id
    if token_id != user_id:
        raise HTTPException(status_code=403, detail="Forbidden: You cannot access other user data")

    try:
        logger.info(f"Generating AI Coach analysis for user: {user_id}")
        logs = database.fetch_user_logs(user_id)
        stats = calculate_acwr(logs)
        
        context_docs = get_ai_recommendation("injury prevention and recovery")
        context_text = ". ".join([f"{d['name']}: {d['description']}" for d in context_docs])
        
        ai_advice = coach.get_coach_advice(
            acwr_score=stats.get('acwr', 0),
            user_logs=f"User has completed {len(logs)} workouts recently.",
            exercise_context=context_text
        )
        
        return {
            "status": "success",
            "data": {
                "acwr": stats.get('acwr'),
                "risk_level": stats.get('status'),
                "ai_coach_advice": ai_advice
            }
        }
    except Exception as e:
        logger.error(f"AI Coach Analysis Error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/ask")
def ask_ai(request: AIRequest, token_id: str = Depends(get_authenticated_user)):
    try:
        context_docs = get_ai_recommendation(request.query)
        context_text = "\n".join([f"{d['name']}: {d['description']}" for d in context_docs]) if context_docs else "No specific protocols."

        chat_prompt = f"""
        You are 'ProActive', a professional AI Strength & Conditioning Coach.
        USER QUESTION: "{request.query}"
        CONTEXT: {context_text}
        ... (Rest of your prompt)
        """
        
        ai_response = coach.client.models.generate_content(
            model=coach.model_id,
            contents=chat_prompt
        )
        return {"status": "Success", "answer": ai_response.text} 
    except Exception as e:
        logger.error(f"AI Chat Error: {e}")
        return {"status": "Error", "message": "The Coach is currently offline."}


@app.get("/analytics/{user_id}")
def get_analytics(user_id: str, token_id: str = Depends(get_authenticated_user)):
    if token_id != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    try:
        logs = database.fetch_user_logs(user_id)
        return calculate_acwr(logs)
    except Exception as e:
        logger.error(f"Analytics Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
    # --- Server Startup ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)