import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard({ onLogout }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Dashboard State
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' or 'history'
  const [showModal, setShowModal] = useState(false);
  const [recentWorkouts, setRecentWorkouts] = useState([]);

  // Form State (For New User Setup)
  const [fullName, setFullName] = useState("");
  const [activity, setActivity] = useState("");

  // Workout Form State
  const [workoutType, setWorkoutType] = useState("Gym");
  const [duration, setDuration] = useState(60);
  const [intensity, setIntensity] = useState(5);
  const [soreness, setSoreness] = useState("None");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // 1. Get Profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // 2. Get Workouts
      const { data: workoutData } = await supabase
        .from("workout_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (workoutData) setRecentWorkouts(workoutData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW USER SETUP FUNCTION (Restored) ---
  const updateProfile = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const updates = {
        id: user.id,
        full_name: fullName,
        sport: activity,
        created_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;
      setProfile(updates); // Update local state so the form disappears
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogWorkout = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("workout_logs").insert([
        {
          user_id: user.id,
          workout_type: workoutType,
          duration: duration,
          intensity: intensity,
          soreness: soreness,
        },
      ]);

      if (error) throw error;

      alert("Workout Logged!");
      setShowModal(false);
      fetchData(); // Refresh list
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );

  // --- IF NO PROFILE, SHOW WELCOME FORM (Restored) ---
  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome to ProActive!
          </h2>
          <p className="text-gray-400 mb-6">
            Tell us about your fitness goals.
          </p>

          <div className="space-y-4 text-left">
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white mt-1"
                placeholder="e.g. Alex Johnson"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Main Activity</label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white mt-1"
                placeholder="e.g. Gym, Running, Yoga"
              />
            </div>
            <button
              onClick={updateProfile}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4"
            >
              Start My Journey
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD (If Profile Exists) ---
  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 flex-col hidden md:flex p-6">
        <h2 className="text-2xl font-bold tracking-tight mb-8">ProActive</h2>
        <nav className="space-y-4 flex-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`text-left w-full py-2 px-3 rounded-lg transition-all ${
              activeTab === "overview"
                ? "bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`text-left w-full py-2 px-3 rounded-lg transition-all ${
              activeTab === "history"
                ? "bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            History
          </button>
        </nav>
        <button
          onClick={onLogout}
          className="text-red-400 text-sm text-left hover:text-red-300"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Hello, {profile.full_name}</h1>
            <p className="text-gray-400">Activity: {profile.sport}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition hover:scale-105"
          >
            + Log Workout
          </button>
        </header>

        {/* --- VIEW: OVERVIEW --- */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider">
                  Readiness Score
                </h3>
                <div className="mt-2 text-5xl font-bold text-green-400">
                  92%
                </div>
                <p className="text-sm text-gray-400 mt-2">Based on recovery.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider">
                  Acute Load
                </h3>
                <div className="mt-2 text-5xl font-bold text-blue-400">Low</div>
                <p className="text-sm text-gray-400 mt-2">
                  Safe to push harder.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider">
                  Total Sessions
                </h3>
                <div className="mt-2 text-5xl font-bold text-purple-400">
                  {recentWorkouts.length}
                </div>
                <p className="text-sm text-gray-400 mt-2">Keep going!</p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Latest Activity</h3>
            <div className="space-y-4">
              {recentWorkouts.slice(0, 3).map((workout) => (
                <div
                  key={workout.id}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg
                      ${
                        workout.workout_type === "Run"
                          ? "bg-orange-500/20 text-orange-400"
                          : workout.workout_type === "Gym"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {workout.workout_type === "Run"
                        ? "🏃"
                        : workout.workout_type === "Gym"
                        ? "💪"
                        : "⚡"}
                    </div>
                    <div>
                      <h4 className="font-bold">
                        {workout.workout_type} Session
                      </h4>
                      <p className="text-sm text-gray-400">
                        {new Date(workout.created_at).toLocaleDateString()} •{" "}
                        {workout.duration} mins
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-bold ${
                      workout.intensity >= 8 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    RPE {workout.intensity}
                  </div>
                </div>
              ))}
              {recentWorkouts.length === 0 && (
                <p className="text-gray-500">No workouts yet.</p>
              )}
            </div>
          </>
        )}

        {/* --- VIEW: HISTORY --- */}
        {activeTab === "history" && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">
              Workout History
            </h2>
            <div className="space-y-4">
              {recentWorkouts.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p>No history available.</p>
                  <p>Log your first workout to see it here!</p>
                </div>
              ) : (
                recentWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-white/5 border border-white/10 p-6 rounded-xl flex justify-between items-center hover:bg-white/10 transition"
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl
                        ${
                          workout.workout_type === "Run"
                            ? "bg-orange-500/20 text-orange-400"
                            : workout.workout_type === "Gym"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {workout.workout_type === "Run"
                          ? "🏃"
                          : workout.workout_type === "Gym"
                          ? "💪"
                          : "⚡"}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">
                          {workout.workout_type} Session
                        </h4>
                        <p className="text-gray-400 mt-1">
                          {new Date(workout.created_at).toLocaleDateString()} at{" "}
                          {new Date(workout.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-gray-300">
                            ⏱ {workout.duration} mins
                          </span>
                          <span
                            className={`${
                              workout.intensity >= 8
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            ⚡ Intensity: {workout.intensity}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: Log Workout */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6">Log Workout</h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Activity Type
                </label>
                <div className="flex gap-2">
                  {["Gym", "Run", "Sport"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setWorkoutType(type)}
                      className={`flex-1 py-2 rounded-lg border ${
                        workoutType === type
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-transparent border-gray-600 text-gray-400 hover:border-gray-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">
                    Intensity (RPE)
                  </label>
                  <span className="text-blue-400 font-bold">
                    {intensity} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-black/20 border border-gray-600 rounded-lg p-3 text-white outline-none"
                />
              </div>
              <button
                onClick={handleLogWorkout}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20"
              >
                Save Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
