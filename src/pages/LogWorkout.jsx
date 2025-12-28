import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LogWorkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    workout_type: "Gym",
    duration: 60,
    intensity: 5,
    soreness: "None",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Get Current User
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in!");
      navigate("/");
      return;
    }

    // 2. Insert Data into Supabase
    const { error } = await supabase.from("workout_logs").insert([
      {
        user_id: user.id,
        workout_type: formData.workout_type,
        duration: formData.duration,
        intensity: formData.intensity,
        soreness: formData.soreness,
        notes: formData.notes,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error logging workout:", error);
      alert("Error saving workout: " + error.message);
    } else {
      // 3. Success! Go back to Dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Log Workout
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block mb-1">Workout Type</label>
            <select
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={formData.workout_type}
              onChange={(e) =>
                setFormData({ ...formData, workout_type: e.target.value })
              }
            >
              <option>Gym</option>
              <option>Run</option>
              <option>Swim</option>
              <option>Sport</option>
              <option>Cardio</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-1">Duration (mins)</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* Intensity Slider */}
          <div>
            <label className="block mb-1">Intensity (RPE 1-10)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                value={formData.intensity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    intensity: parseInt(e.target.value),
                  })
                }
              />
              <span className="text-xl font-bold text-yellow-400 w-8">
                {formData.intensity}
              </span>
            </div>
          </div>

          {/* Soreness */}
          <div>
            <label className="block mb-1">Muscle Soreness?</label>
            <select
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={formData.soreness}
              onChange={(e) =>
                setFormData({ ...formData, soreness: e.target.value })
              }
            >
              <option>None</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Extreme</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-1">Notes (Optional)</label>
            <textarea
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              rows="3"
              placeholder="Leg day, felt good..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-gray-700 hover:bg-gray-600 p-3 rounded font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold transition"
            >
              {loading ? "Saving..." : "Save Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
