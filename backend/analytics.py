import pandas as pd
from datetime import datetime, timedelta

def calculate_acwr(logs):
    """
    Calculates Acute Load (7 days), Chronic Load (28 days), and ACWR.
    Input: List of workout dictionaries from Supabase.
    """
    if not logs:
        return {
            "acute_load": 0,
            "chronic_load": 0,
            "acwr": 0,
            "status": "No Data"
        }
    # 1. Convert logs to DataFrame
    df = pd.DataFrame(logs)
    
    # 2. Create 'load' column (Duration * Intensity)
    # Example: 60 mins * 5 RPE = 300 Load Units
    df['load'] = df['duration'] * df['intensity']
    
    # 3. Convert timestamps to Date objects
    df['date'] = pd.to_datetime(df['created_at']).dt.tz_localize(None) # Remove timezone for math
    today = datetime.now()

    # 4. Filter Data
    # Acute = Last 7 Days
    acute_start = today - timedelta(days=7)
    acute_load = df[df['date'] >= acute_start]['load'].sum()

    # Chronic = Last 28 Days (Average weekly load)
    chronic_start = today - timedelta(days=28)
    total_chronic_load = df[df['date'] >= chronic_start]['load'].sum()
    chronic_avg = total_chronic_load / 4  # Average per week

    # 5. Calculate Ratio
    if chronic_avg == 0:
        ratio = 0 
    else:
        ratio = round(acute_load / chronic_avg, 2)

    # 6. Determine Status
    if ratio == 0:
        status = "No Recent Training"
    elif ratio < 0.8:
        status = "Undertraining (Risk of detraining)"
    elif 0.8 <= ratio <= 1.3:
        status = "Optimal Zone (Safe)"
    elif 1.3 < ratio <= 1.5:
        status = "High Load (Caution)"
    else:
        status = "DANGER ZONE (High Injury Risk)"

    return {
        "acute_load": int(acute_load),
        "chronic_load": int(chronic_avg),
        "acwr": ratio,
        "status": status
    }