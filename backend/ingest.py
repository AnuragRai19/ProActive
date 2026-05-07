import pandas as pd
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
import os

# 1. Load Data
print("Loading datasets...")

if not os.path.exists("data/gym_exercise_dataset.csv") or not os.path.exists("data/stretch_exercise_dataset.csv"):
    print("❌ ERROR: CSV files not found!")
    exit()

gym_df = pd.read_csv("data/gym_exercise_dataset.csv")
stretch_df = pd.read_csv("data/stretch_exercise_dataset.csv")

documents = []

# 2. Process Gym Exercises
print("Processing Gym Exercises...")
for _, row in gym_df.iterrows():
    text_content = f"""
    Exercise: {row['Exercise Name']}
    Type: Gym / Strength
    Main Muscle: {row.get('Main_muscle', 'General')}
    Equipment: {row.get('Equipment', 'Body Only')}
    Instructions: {row.get('Preparation', '')} {row.get('Execution', '')}
    """
    metadata = {
        "name": row['Exercise Name'],
        "type": "Strength",
        "muscle": row.get('Main_muscle', 'General'),
        "equipment": row.get('Equipment', 'Body Only')
    }
    documents.append(Document(page_content=text_content, metadata=metadata))

# 3. Process Stretch Exercises
print("Processing Stretch Exercises...")
for _, row in stretch_df.iterrows():
    text_content = f"""
    Exercise: {row['Exercise Name']}
    Type: Stretching / Recovery
    Main Muscle: {row.get('Main_muscle', 'General')}
    Equipment: {row.get('Equipment', 'None')}
    Instructions: {row.get('Preparation', '')} {row.get('Execution', '')}
    """
    metadata = {
        "name": row['Exercise Name'],
        "type": "Stretch",
        "muscle": row.get('Main_muscle', 'General'),
        "equipment": row.get('Equipment', 'None')
    }
    documents.append(Document(page_content=text_content, metadata=metadata))

# 4. (NEW) Add Expert Recovery Knowledge
# This acts as our "Rest Dataset"
print("Injecting Recovery Protocols...")

recovery_knowledge = [
    {
        "name": "Sleep & Circadian Rhythm",
        "type": "Rest Protocol",
        "muscle": "Brain & Nervous System",
        "equipment": "Bed",
        "content": "Sleep is the #1 recovery tool. Aim for 7-9 hours per night. Deep sleep releases growth hormone for muscle repair. REM sleep consolidates motor learning. Avoid screens 1 hour before bed."
    },
    {
        "name": "Active Recovery",
        "type": "Rest Protocol",
        "muscle": "Full Body",
        "equipment": "None",
        "content": "On rest days, avoid complete inactivity. 'Active Recovery' (walking, light yoga, swimming) increases blood flow, which clears metabolic waste (lactate) and speeds up muscle repair without straining the body."
    },
    {
        "name": "Hydration Strategy",
        "type": "Nutrition",
        "muscle": "Full Body",
        "equipment": "Water Bottle",
        "content": "Dehydration increases cortisol (stress hormone) and reduces strength. Drink 500ml of water immediately upon waking. Aim for clear pale urine throughout the day. Add electrolytes if sweating heavily."
    },
    {
        "name": "Protein & Nutrition",
        "type": "Nutrition",
        "muscle": "Muscles",
        "equipment": "Kitchen",
        "content": "To repair muscles, consume 1.6g to 2.2g of protein per kg of body weight. Consuming protein within 2 hours post-workout maximizes muscle protein synthesis (MPS)."
    },
    {
        "name": "Deload Week",
        "type": "Training Strategy",
        "muscle": "Joints & CNS",
        "equipment": "Gym",
        "content": "Every 4-6 weeks, perform a 'Deload Week'. Reduce weights by 50% or volume by 50%. This allows joints, tendons, and the Central Nervous System (CNS) to fully recover and prevents burnout."
    },
    {
        "name": "Contrast Bath Therapy",
        "type": "Recovery Strategy",
        "muscle": "Legs / Full Body",
        "equipment": "Bath",
        "content": "Alternating between hot (1-2 min) and cold (1 min) water immersion can improve circulation and reduce inflammation. Repeat 3-5 cycles, always ending on cold."
    }
]

for item in recovery_knowledge:
    text_content = f"""
    Topic: {item['name']}
    Category: {item['type']}
    Benefit: {item['muscle']}
    Details: {item['content']}
    """
    metadata = {
        "name": item['name'],
        "type": item['type'],
        "muscle": item['muscle'],
        "equipment": item['equipment']
    }
    documents.append(Document(page_content=text_content, metadata=metadata))

print(f"Total documents created: {len(documents)}")

# 5. Create & Save Database
print("Updating Vector Database...")
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_db = FAISS.from_documents(documents, embeddings)
vector_db.save_local("faiss_index")
print("✅ Success! The Brain now knows about Rest & Recovery.")