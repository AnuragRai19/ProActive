import logging
import os
from fastapi import FastAPI, HTTPException
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

# 2. CORS Middleware - Updated for your React Port
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIRequest(BaseModel):
    query: str

@app.get("/")
def read_root():
    return {"message": "ProActive Backend is Online - Gemini 2.5 Flash Active"}


@app.get("/api/coach/analyze/{user_id}")
async def get_ai_coach_analysis(user_id: str):
    try:
        logger.info(f"Generating AI Coach analysis for user: {user_id}")
        
        # 1. Fetch Logs and Calculate ACWR
        logs = database.fetch_user_logs(user_id)
        stats = calculate_acwr(logs)
        
        # 2. Fetch RAG context from FAISS for recovery
        context_docs = get_ai_recommendation("injury prevention and recovery")
        context_text = ". ".join([f"{d['name']}: {d['description']}" for d in context_docs])
        
        # 3. Get Personalized AI Advice
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
def ask_ai(request: AIRequest):
    """
    Hybrid RAG Pipeline: Searches FAISS then uses Gemini to 'talk'.
    """
    try:
        # 1. Search FAISS for the best matching exercise protocol
        context_docs = get_ai_recommendation(request.query)
        
        if not context_docs:
            context_text = "No specific exercise protocols found in the database."
        else:
            context_text = "\n".join([
                f"Exercise: {d['name']}, Target: {d['muscle']}, Instructions: {d['description']}" 
                for d in context_docs
            ])

        # 2. Use Gemini to transform raw data into a conversational response
        # We use a custom prompt to ensure the AI uses the provided context
        chat_prompt = f"""
        You are 'ProActive', a professional AI Strength & Conditioning Coach.
        
        USER QUESTION: "{request.query}"
        
        EXERCISE PROTOCOLS FROM DATABASE:
        {context_text}
        
        INSTRUCTIONS:
        - If the user has pain, advise caution and prioritize rest.
        - Explain how to perform the specific exercises found in the database.
        - Use a supportive, coaching tone.
        - Keep the response professional and under 120 words.
        """
        
        # Using the generate_content method from our modernized service
        ai_response = coach.client.models.generate_content(
            model=coach.model_id,
            contents=chat_prompt
        )
       
        # Return 'answer' as a STRING so React doesn't crash
        return {"status": "Success", "answer": ai_response.text} 
        
    except Exception as e:
        logger.error(f"AI Chat Error: {e}")
        return {"status": "Error", "message": "The Coach is currently offline."}

@app.get("/analytics/{user_id}")
def get_analytics(user_id: str):
    try:
        logs = database.fetch_user_logs(user_id)
        return calculate_acwr(logs)
    except Exception as e:
        logger.error(f"Analytics Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))