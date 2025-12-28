import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      // Fetch logs, ordered by newest first
      const { data, error } = await supabase
        .from("workout_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching history:", error);
      else setLogs(data);

      setLoading(false);
    };

    fetchHistory();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">Workout History</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        {loading ? (
          <p>Loading records...</p>
        ) : logs.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            <p>No workouts found.</p>
            <button
              onClick={() => navigate("/log-workout")}
              className="text-blue-400 underline mt-2"
            >
              Log your first workout
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {log.workout_type}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(log.created_at).toLocaleDateString()} •{" "}
                    {log.duration} mins • Intensity: {log.intensity}
                  </p>
                  {log.notes && (
                    <p className="text-gray-500 text-sm mt-1 italic">
                      "{log.notes}"
                    </p>
                  )}
                </div>
                <div
                  className={`font-bold ${
                    log.intensity >= 8 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  RPE {log.intensity}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
