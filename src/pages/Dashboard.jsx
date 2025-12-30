import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  // 1. Analytics State
  const [analytics, setAnalytics] = useState({
    acwr: 0,
    status: "Loading...",
    acute_load: 0,
  });

  // 2. NEW: Readiness State
  const [readiness, setReadiness] = useState(7); // Default to 7/10

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      // Set the name
      if (user.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      }

      // Call Python Backend
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/analytics/${user.id}`
        );
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        setAnalytics({ status: "Error connecting to Brain", acwr: 0 });
      }
    };

    fetchUserData();
  }, [navigate]);

  // 3. NEW: Function to Save Readiness to Supabase
  const handleSaveReadiness = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("daily_checkins").insert([
      {
        user_id: user.id,
        readiness_score: parseInt(readiness),
      },
    ]);

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      alert("✅ Readiness saved for today!");
    }
  };

  // Helper for text colors
  const getStatusColor = (status) => {
    if (status && status.includes("DANGER")) return "text-red-500 font-bold";
    if (status && status.includes("Optimal")) return "text-green-500 font-bold";
    return "text-yellow-500 font-bold";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              ProActive Dashboard
            </h1>
            <p className="text-gray-400">Welcome back, {userName}!</p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/");
            }}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>

        {/* 1. HERO CARD: ACWR Injury Risk */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center">
            <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">
              Injury Risk (ACWR)
            </h2>

            <div className="text-6xl font-extrabold text-white mb-4">
              {analytics.acwr || 0}
            </div>

            <div className="inline-block px-4 py-2 rounded-full border border-gray-600 bg-gray-900 mb-6">
              <p
                className={`text-lg font-bold ${getStatusColor(
                  analytics.status
                )}`}
              >
                {analytics.status}
              </p>
            </div>

            <p className="text-gray-400 text-sm border-t border-gray-700 pt-4 w-1/2 mx-auto">
              Acute Load:{" "}
              <span className="text-white">{analytics.acute_load || 0}</span>{" "}
              (Last 7 Days)
            </p>
          </div>
        </div>

        {/* 2. READINESS CHECK-IN (NEW SECTION) */}
        <div className="mb-8">
          <div className="bg-linear-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                Daily Body Battery 🔋
              </h3>
              {/* Save Button */}
              <button
                onClick={handleSaveReadiness}
                className="bg-blue-600 px-3 py-1 rounded text-xs font-bold hover:bg-blue-500 transition"
              >
                Save Log
              </button>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="1"
              max="10"
              value={readiness}
              onChange={(e) => setReadiness(e.target.value)}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4"
            />

            {/* Dynamic Text Feedback */}
            <div className="flex justify-between items-end">
              <div>
                <div className="text-4xl font-bold text-white mb-1">
                  {readiness}{" "}
                  <span className="text-xl text-gray-500">/ 10</span>
                </div>
                <p
                  className={`font-bold ${
                    readiness >= 8
                      ? "text-green-400"
                      : readiness >= 5
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {readiness >= 8
                    ? "🚀 Ready to Crush It!"
                    : readiness >= 5
                    ? "⚠️ Proceed with Caution"
                    : "🛑 Active Recovery Recommended"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ACTION BUTTONS (FIXED NESTING ERROR) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/log-workout")}
            className="p-6 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg text-left hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">📝 Log Workout</h2>
            <p className="opacity-90">Track your latest session</p>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg text-left hover:bg-gray-750 transition"
          >
            <h2 className="text-2xl font-bold mb-2">📅 History</h2>
            <p className="text-gray-400">View past training logs</p>
          </button>

          <button
            onClick={() => navigate("/ai-coach")}
            className="p-6 bg-linear-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg text-left hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">🤖 AI Coach</h2>
            <p className="opacity-90">Get recovery & injury advice</p>
          </button>
        </div>
      </div>
    </div>
  );
}
