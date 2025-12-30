from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

# 1. Load the Database
print("Loading AI Brain...")
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# --- Knowledge Base for Advice ---
INJURY_PREVENTION_TIPS = {
    "knee": "⚠️ **Knee Safety:** Avoid locking your knees. Keep them aligned with your toes (no caving in).",
    "back": "⚠️ **Spine Safety:** Engage your core. Don't round your lower back when bending.",
    "shoulder": "⚠️ **Shoulder Safety:** Keep shoulders down (away from ears). Avoid flaring elbows wide.",
    "neck": "⚠️ **Neck Safety:** Keep your chin tucked. Don't crane your neck forward.",
    "wrist": "⚠️ **Wrist Safety:** Keep wrists neutral. Don't let them bend backward under load.",
    "ankle": "⚠️ **Ankle Safety:** Wear supportive footwear. Avoid uneven surfaces if unstable. Strengthen calves to support the joint." # <--- ADDED ANKLE
}

def get_ai_recommendation(query: str):
    print(f"Thinking about: {query}")
    query_lower = query.lower()
    recommendations = []
    
    # --- STEP 1: Detect Pain (EXPANDED LIST) ---
    pain_keywords = [
        "pain", "hurt", "sore", "ache", "injury", "pull", "strain", 
        "tired", "fatigue", "sprain", "sprained", "tear", "torn", 
        "break", "broken", "stiff", "tight", "swollen", "swelling"
    ] # <--- ADDED SPRAIN, TEAR, SWOLLEN, ETC.

    is_pain_mode = any(word in query_lower for word in pain_keywords)

    # --- STEP 2: Logic Layer (Advice) ---
    if is_pain_mode:
        # A. Add Medical Advice
        recommendations.append({
            "name": "🚑 Immediate Recovery Protocol (R.I.C.E)",
            "type": "Medical Advice",
            "muscle": "Full Body",
            "equipment": "None",
            "description": "🧊 **Rest:** Stop activity immediately.\n❄️ **Ice:** 15-20 min to reduce inflammation.\n🤕 **Compression:** Light bandage/brace.\n🛏️ **Elevation:** Raise injured area above heart level."
        })
        
        # B. Modify the Search Query
        # If user says "sprained ankle", we search for "ankle gentle rehab recovery"
        search_query = query + " gentle stretch recovery rehabilitation"
    else:
        # Normal search
        search_query = query

    # C. Add Body Part Safety Tips
    for body_part, tip in INJURY_PREVENTION_TIPS.items():
        if body_part in query_lower:
            recommendations.append({
                "name": f"🛡️ Injury Prevention: {body_part.title()}",
                "type": "Safety Tip",
                "muscle": body_part.title(),
                "equipment": "Knowledge",
                "description": tip
            })

    # --- STEP 3: The Search & Filter ---
    results = vector_db.similarity_search(search_query, k=5)
    
    for doc in results:
        doc_type = doc.metadata.get('type', 'Unknown')
        
        # 🛑 THE FILTER LOGIC 🛑
        # If user is in PAIN, SKIP "Strength" exercises
        if is_pain_mode and doc_type == "Strength":
            continue
            
        recommendations.append({
            "name": doc.metadata['name'],
            "type": doc.metadata['type'],
            "muscle": doc.metadata['muscle'],
            "equipment": doc.metadata['equipment'],
            "description": doc.page_content
        })
    
    # Fallback if filter removes everything
    if not recommendations:
         recommendations.append({
            "name": "Consult a Doctor",
            "type": "Medical Advice",
            "muscle": "General",
            "equipment": "None",
            "description": "Your injury sounds serious. Please rest and see a specialist before attempting exercises."
        })

    return recommendations[:4]