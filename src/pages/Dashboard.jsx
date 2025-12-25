import { useState } from "react";

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("Today's Advice");
  const [showSorenessModal, setShowSorenessModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);

  // Mock user data - This will eventually come from Supabase
  const userData = {
    name: "Vishnu Manoj",
    primarySport: "Soccer",
    trainingLoad: 850, // Example value
    totalWorkouts: 12,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                  ProActive
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:inline">
                {userData.name}
              </span>
              <button
                onClick={onLogout}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowSorenessModal(true)}
            className="group bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤕</span>
              <div className="text-left">
                <p className="font-semibold">Log Soreness</p>
                <p className="text-xs text-gray-400 font-normal">
                  Track recovery & pain
                </p>
              </div>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          <button
            onClick={() => setShowWorkoutModal(true)}
            className="group bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💪</span>
              <div className="text-left">
                <p className="font-semibold">Log Workout</p>
                <p className="text-xs text-blue-200 font-normal">
                  Record training load
                </p>
              </div>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 7-Day Training Load */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">
                  7-Day Load
                </h3>
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {userData.trainingLoad}
              </div>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Optimal Range
              </p>
            </div>
          </div>

          {/* Total Workouts */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Workouts
              </h3>
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {userData.totalWorkouts}
            </div>
            <p className="text-xs text-gray-400">Sessions logged</p>
          </div>

          {/* Primary Sport */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Primary Sport
              </h3>
              <span className="text-xl">⚽</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {userData.primarySport}
            </div>
            <p className="text-xs text-gray-400">Focus area</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex">
              {[
                "Today's Advice",
                "Analytics",
                "Exercise Library",
                "Profile",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition border-b-2 ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600 bg-blue-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "Today's Advice" && (
              <TodaysAdvice sport={userData.primarySport} />
            )}
            {activeTab === "Analytics" && <Analytics />}
            {activeTab === "Exercise Library" && <ExerciseLibrary />}
            {activeTab === "Profile" && <Profile userData={userData} />}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSorenessModal && (
        <SorenessModal onClose={() => setShowSorenessModal(false)} />
      )}
      {showWorkoutModal && (
        <WorkoutModal onClose={() => setShowWorkoutModal(false)} />
      )}
    </div>
  );
}

/* --- SUB COMPONENTS --- */

function TodaysAdvice({ sport }) {
  return (
    <div className="space-y-6">
      {/* Ready to Train Banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-green-900 mb-1">
            Ready to Train
          </h3>
          <p className="text-green-700 text-sm">
            Your Acute:Chronic Workload Ratio (1.1) is optimal. You are safe to
            push hard today.
          </p>
        </div>
      </div>

      {/* Personalized Warm-up */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-blue-600">⚡</span>
          Warm-up Protocol: {sport}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-xs font-bold text-blue-600 uppercase mb-1">
              Part 1
            </div>
            <div className="font-semibold text-gray-900">Light Cardio</div>
            <div className="text-sm text-gray-500">5-10 mins jogging</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-xs font-bold text-blue-600 uppercase mb-1">
              Part 2
            </div>
            <div className="font-semibold text-gray-900">
              Dynamic Stretching
            </div>
            <div className="text-sm text-gray-500">Leg swings, High knees</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-xs font-bold text-blue-600 uppercase mb-1">
              Part 3
            </div>
            <div className="font-semibold text-gray-900">Activation</div>
            <div className="text-sm text-gray-500">Glute bridges, Lunges</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
      <div className="text-4xl mb-4">📊</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Data Collection Phase
      </h3>
      <p className="text-gray-500 text-sm">
        Log at least 3 workouts to unlock detailed injury risk trends.
      </p>
    </div>
  );
}

function ExerciseLibrary() {
  const exercises = [
    { name: "Running", emoji: "🏃", risk: "Medium", type: "Cardio" },
    { name: "Cycling", emoji: "🚴", risk: "Low", type: "Cardio" },
    { name: "Deadlifts", emoji: "🏋️", risk: "High", type: "Strength" },
    { name: "Squats", emoji: "🦵", risk: "Medium", type: "Strength" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {exercises.map((ex, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer"
        >
          <div className="text-3xl mb-3">{ex.emoji}</div>
          <h4 className="font-bold text-gray-900">{ex.name}</h4>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">{ex.type}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                ex.risk === "High"
                  ? "bg-red-100 text-red-700"
                  : ex.risk === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {ex.risk} Risk
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Profile({ userData }) {
  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Athlete Profile</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between">
          <span className="text-gray-600">Name</span>
          <span className="font-medium text-gray-900">{userData.name}</span>
        </div>
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between">
          <span className="text-gray-600">Sport</span>
          <span className="font-medium text-gray-900">
            {userData.primarySport}
          </span>
        </div>
        <div className="px-6 py-4 flex justify-between bg-red-50">
          <span className="text-red-700 font-medium">Injury History</span>
          <span className="text-red-700 font-bold">ACL Tear (2023)</span>
        </div>
      </div>
    </div>
  );
}

/* --- MODALS --- */

function SorenessModal({ onClose }) {
  const [level, setLevel] = useState(3);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg">Log Recovery</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            How sore are you today?
          </label>
          <div className="flex items-center justify-center text-4xl font-bold text-blue-600 mb-6">
            {level}{" "}
            <span className="text-base text-gray-400 font-normal ml-2">
              / 10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
            <span>Fresh</span>
            <span>Can't Walk</span>
          </div>
          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800"
            >
              Save Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkoutModal({ onClose }) {
  const [duration, setDuration] = useState(60);
  const [intensity, setIntensity] = useState(5);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-blue-600">
          <h3 className="font-bold text-lg text-white">Log Workout</h3>
          <button onClick={onClose} className="text-blue-100 hover:text-white">
            ✕
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Duration (Minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg font-medium focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              RPE (Intensity)
            </label>
            <div className="flex justify-between mb-2">
              <span className="text-2xl font-bold text-gray-900">
                {intensity}
              </span>
              <span className="text-sm text-gray-500 self-center">
                {intensity <= 4
                  ? "Light Effort"
                  : intensity <= 7
                  ? "Hard Training"
                  : "Max Effort"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center border border-blue-100">
            <span className="text-blue-900 font-medium">Estimated Load</span>
            <span className="text-2xl font-bold text-blue-700">
              {duration * intensity}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 shadow-lg"
          >
            Complete Log
          </button>
        </div>
      </div>
    </div>
  );
}
