import os
from supabase import create_client, Client
from dotenv import load_dotenv

# 1. Load the keys from the .env file
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# 2. Check if keys exist (Safety check)
if not url or not key:
    raise ValueError("Missing Supabase credentials in .env file")

# 3. Create the connection
supabase: Client = create_client(url, key)