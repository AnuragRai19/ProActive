import os
import logging
from supabase import create_client, Client
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# 1. Load the keys from the .env file
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# 2. Check if keys exist (Safety check)
if not url or not key:
    logger.critical("Supabase credentials missing in .env!")
    raise ValueError("Missing Supabase credentials in .env file")

# 3. Create the connection
try:
    supabase: Client = create_client(url, key)
    logger.info("Connected to Supabase successfully") 
except Exception as e:
    logger.critical(f"Failed to connect to Supabase: {e}")
    raise e

# --- NEW: HELPER FUNCTIONS (The "Data Layer") ---

def fetch_user_logs(user_id: str):
    """Fetch all workout logs for a specific user."""
    try:
        # We use .select("*") to get all columns
        response = supabase.table("workout_logs") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .execute()
        return response.data
    except Exception as e:
        logger.error(f"DB Error (fetch_user_logs): {e}")
        return []

def fetch_daily_checkins(user_id: str):
    """Fetch daily readiness scores."""
    try:
        response = supabase.table("daily_checkins") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .limit(1) \
            .execute()
        return response.data
    except Exception as e:
        logger.error(f"DB Error (fetch_daily_checkins): {e}")
        return []