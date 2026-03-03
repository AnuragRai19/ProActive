import os
from google import genai  
from dotenv import load_dotenv

load_dotenv()

class GeminiCoach:
    def __init__(self):
        
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
       
        self.model_id = "gemini-2.5-flash" 

    def get_coach_advice(self, acwr_score, user_logs, exercise_context):
        system_prompt = f"""
        You are 'ProActive', an elite AI Sports Scientist.
        
        DATA:
        - ACWR Score: {acwr_score}
        - Recent Volume: {user_logs}
        - Expert Knowledge (RAG): {exercise_context}

        TASK:
        1. Interpret the ACWR.
        2. Give 2-3 specific recovery tips based on the context.
        3. Keep it professional and under 150 words.
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=system_prompt
            )
            return response.text
        except Exception as e:
            return f"The AI Coach is momentarily unavailable: {str(e)}"