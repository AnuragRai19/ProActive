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

        {/* Analytics Grid - Full Width & Symmetric */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Card 1: Injury Risk (Full Width) */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center">
            <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">
              Injury Risk (ACWR)
            </h2>

            <div className="text-6xl font-extrabold text-white mb-4">
              {analytics.acwr}
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
              <span className="text-white">{analytics.acute_load}</span> (Last 7
              Days)
            </p>
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
            <button
              onClick={() => navigate("/ai-coach")}
              className="p-6 bg-linear-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg text-left hover:scale-105 transition"
            >
              <h2 className="text-2xl font-bold mb-2">🤖 AI Coach</h2>
              <p className="opacity-90">
                Get instant recovery advice & exercises
              </p>
            </button>
          </button>
        </div>
      </div>
    </div>
  );
}
