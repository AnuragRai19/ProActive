import pandas as pd
from datetime import datetime, timedelta

def calculate_acwr(logs):
    """
    Calculates Acute Load, Chronic Load, ACWR, AND Weekly Workout Count.
    """
    if not logs:
        return {
            "acute_load": 0,
            "chronic_load": 0,
            "acwr": 0,
            "status": "No Data",
            "weekly_count": 0  
        }
    
    # 1. Convert logs to DataFrame
    df = pd.DataFrame(logs)
    
    # 2. Create 'load' column (Duration * Intensity)
    df['load'] = df['duration'] * df['intensity']
    
    # 3. Convert timestamps to Date objects
    # We use 'coerce' to handle any weird date formats safely
    df['date'] = pd.to_datetime(df['created_at'], errors='coerce').dt.tz_localize(None)
    today = datetime.now()

    # 4. Filter Data for Acute (Last 7 Days)
    acute_start = today - timedelta(days=7)
    
    # Create a subset of data for just the last 7 days
    acute_df = df[df['date'] >= acute_start]
    
    # Calculate Load (Sum of load in last 7 days)
    acute_load = acute_df['load'].sum()
    
    # Calculate Count (How many workouts in last 7 days?)
    weekly_count = len(acute_df) 

    # 5. Filter Data for Chronic (Last 28 Days)
    chronic_start = today - timedelta(days=28)
    total_chronic_load = df[df['date'] >= chronic_start]['load'].sum()
    chronic_avg = total_chronic_load / 4  # Average per week

    # 6. Calculate Ratio
    if chronic_avg == 0:
        ratio = 0 
    else:
        ratio = round(acute_load / chronic_avg, 2)

    # 7. Determine Status
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

    
    if chronic_avg > 0 and (acute_load / chronic_avg) > 2.0:
         status = "Calibrating System ⚙️" 
         

    return {
        "acute_load": int(acute_load),
        "chronic_load": int(chronic_avg),
        "acwr": ratio,
        "status": status,
        "weekly_count": weekly_count
    }