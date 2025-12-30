import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LogWorkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // New State for Date
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Defaults to Today
  const [type, setType] = useState("Strength");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from("workout_logs").insert([
        {
          user_id: user.id,
          workout_type: type,
          duration: parseInt(duration),
          intensity: parseInt(intensity),
          notes: notes,
          created_at: date, // <--- Saves the chosen date, not just "now"
        },
      ]);

      if (error) {
        alert("Error logging workout: " + error.message);
      } else {
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-400">Log Session</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 1. NEW: Date Picker */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Date of Workout
            </label>
            <input
              type="date"
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Workout Type
            </label>
            <select
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Strength</option>
              <option>Cardio</option>
              <option>HIIT</option>
              <option>Recovery / Yoga</option>
              <option>Sports Match</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              placeholder="e.g. 45"
              required
              min="1"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Intensity (RPE 1-10)
              <span className="block text-xs text-gray-500">
                1 = Easy, 10 = Max Effort
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
            />
            <div className="text-center font-bold text-blue-400 mt-1">
              {intensity} / 10
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Notes (Optional)
            </label>
            <textarea
              placeholder="How did it feel? Any pain?"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 h-24"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 p-4 rounded font-bold hover:bg-green-500 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Saving..." : "✅ Finish & Save Workout"}
          </button>
        </form>
      </div>
    </div>
  );
}
