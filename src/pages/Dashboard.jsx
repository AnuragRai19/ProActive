import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  // 1. New State for Analytics
  const [analytics, setAnalytics] = useState({
    acwr: 0,
    status: "Loading...",
    acute_load: 0,
  });

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

      // Set the name (from metadata)
      if (user.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      }

      // 2. CALL PYTHON BACKEND
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/analytics/${user.id}`
        );
        const data = await response.json();
        setAnalytics(data); // Save the JSON to state
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        setAnalytics({ status: "Error connecting to Brain", acwr: 0 });
      }
    };

    fetchUserData();
  }, [navigate]);

  // Helper function to pick color based on risk
  const getStatusColor = (status) => {
    if (status.includes("DANGER")) return "text-red-500 font-bold";
    if (status.includes("Optimal")) return "text-green-500 font-bold";
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

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Injury Risk (POWERED BY PYTHON) */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">Injury Risk (ACWR)</h2>
            <div className="text-4xl font-bold mb-2">{analytics.acwr}</div>
            <p className={`text-lg ${getStatusColor(analytics.status)}`}>
              {analytics.status}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Acute Load: {analytics.acute_load} (Last 7 Days)
            </p>
          </div>

          {/* Card 2: Quick Stats (Placeholder for now) */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">Weekly Goal</h2>
            <div className="text-4xl font-bold text-green-400">3 / 5</div>
            <p className="text-gray-400">Workouts completed</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/log-workout")}
            className="p-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-center font-semibold"
          >
            + Log Workout
          </button>
          <button
            onClick={() => navigate("/history")}
            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-center font-semibold"
          >
            View History
          </button>
          <button className="p-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition text-center font-semibold">
            Ask AI Coach
          </button>
        </div>
      </div>
    </div>
  );
}
