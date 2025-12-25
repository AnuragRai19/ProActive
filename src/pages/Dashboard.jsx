import { useState } from "react";

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("Today's Advice");
  const [showSorenessModal, setShowSorenessModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);

  // Mock user data
  const userData = {
    name: "Vishnu Manoj",
    age: 22,
    gender: "Male",
    primarySport: "Soccer",
    trainingLoad: 0,
    totalWorkouts: 0,
    pastInjuries: ["ACL injury"],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Fitness Guard
                </h1>
                <p className="text-xs text-gray-500">
                  Welcome back, {userData.name}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowSorenessModal(true)}
            className="bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
          >
            <span className="text-xl">+</span>
            <span>Log Today's Soreness</span>
          </button>
          <button
            onClick={() => setShowWorkoutModal(true)}
            className="bg-white text-gray-900 px-6 py-4 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2 font-semibold border-2 border-gray-200 shadow-sm"
          >
            <span className="text-xl">+</span>
            <span>Log Workout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 7-Day Training Load */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                7-Day Training Load
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
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {userData.trainingLoad}
            </div>
            <p className="text-sm text-gray-500">Duration × Intensity</p>
          </div>

          {/* Total Workouts */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
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
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {userData.totalWorkouts}
            </div>
            <p className="text-sm text-gray-500">Sessions logged</p>
          </div>

          {/* Primary Sport */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                Primary Sport
              </h3>
              <span className="text-2xl">⚽</span>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {userData.primarySport}
            </div>
            <p className="text-sm text-gray-500">Your focus area</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
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
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "Today's Advice" && <TodaysAdvice />}
            {activeTab === "Analytics" && <Analytics />}
            {activeTab === "Exercise Library" && <ExerciseLibrary />}
            {activeTab === "Profile" && <Profile userData={userData} />}
          </div>
        </div>
      </div>

      {/* Soreness Modal */}
      {showSorenessModal && (
        <SorenessModal onClose={() => setShowSorenessModal(false)} />
      )}

      {/* Workout Modal */}
      {showWorkoutModal && (
        <WorkoutModal onClose={() => setShowWorkoutModal(false)} />
      )}
    </div>
  );
}

// Today's Advice Tab Component
function TodaysAdvice() {
  return (
    <div className="space-y-6">
      {/* Ready to Train Banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
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
          <h3 className="text-lg font-semibold text-green-900 mb-1">
            Ready to Train
          </h3>
          <p className="text-green-700">
            Good recovery status. You're ready for a full training session.
          </p>
        </div>
      </div>

      {/* Personalized Warm-up */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-6 h-6 text-blue-600"
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
          <h3 className="text-lg font-semibold text-gray-900">
            Your Personalized Warm-up
          </h3>
        </div>
        <p className="text-gray-600 mb-4">Based on your sport: soccer</p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <span className="text-gray-900">5-10 minutes of light cardio</span>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <span className="text-gray-900">
              Dynamic stretches (leg swings, high knees)
            </span>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <span className="text-gray-900">Sport-specific movements</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics Tab Component
function Analytics() {
  return (
    <div className="text-center py-12">
      <svg
        className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Analytics Yet
      </h3>
      <p className="text-gray-600">
        Start logging workouts to see your training analytics and trends.
      </p>
    </div>
  );
}

// Exercise Library Tab Component
function ExerciseLibrary() {
  const exercises = [
    {
      name: "Running",
      emoji: "🏃",
      risk: "Medium",
      injuries: 5,
      description:
        "A high-impact cardiovascular exercise that strengthens the heart...",
    },
    {
      name: "Cycling",
      emoji: "🚴",
      risk: "Low",
      injuries: 5,
      description:
        "A low-impact cardiovascular exercise excellent for building leg strength...",
    },
    {
      name: "Push-ups",
      emoji: "💪",
      risk: "Low",
      injuries: 4,
      description:
        "A compound bodyweight exercise that targets chest, shoulders, tricep...",
    },
    {
      name: "Squats",
      emoji: "🏋️",
      risk: "Medium",
      injuries: 5,
      description:
        "A fundamental lower body exercise that targets quadriceps, hamstrings...",
    },
    {
      name: "Deadlifts",
      emoji: "🏋️",
      risk: "High",
      injuries: 6,
      description:
        "A compound exercise that works the entire posterior chain...",
    },
    {
      name: "Bench Press",
      emoji: "🏋️",
      risk: "High",
      injuries: 5,
      description:
        "A classic upper body exercise targeting chest, shoulders, and triceps...",
    },
  ];

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <svg
          className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-blue-900">
          Click on any exercise card to view detailed injury prevention tips,
          proper form guidance, and warm up routines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
              {exercise.emoji}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                  {exercise.name}
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    exercise.risk === "Low"
                      ? "bg-green-100 text-green-700"
                      : exercise.risk === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {exercise.risk} Risk
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {exercise.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{exercise.injuries} common injuries</span>
                <span className="text-blue-600 font-medium">View tips →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Profile Tab Component
function Profile({ userData }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h2>
      <p className="text-gray-600 mb-8">
        Personal information and injury history
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
              {userData.name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
              {userData.age}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
              {userData.gender}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Sport
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
              {userData.primarySport}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Past Injuries
          </label>
          <div className="space-y-2">
            {userData.pastInjuries.map((injury, index) => (
              <div
                key={index}
                className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-red-900 font-medium">{injury}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Soreness Modal Component
function SorenessModal({ onClose }) {
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [sorenessLevel, setSorenessLevel] = useState(3);

  const bodyParts = [
    "Neck",
    "Shoulders",
    "Upper Back",
    "Lower Back",
    "Chest",
    "Biceps",
    "Triceps",
    "Forearms",
    "Abs",
    "Hip Flexors",
    "Quadriceps",
    "Hamstrings",
    "Glutes",
    "Calves",
    "Ankles",
    "Knees",
  ];

  const getSorenessLabel = (level) => {
    if (level <= 2) return "(Mild)";
    if (level <= 4) return "(Moderate)";
    if (level <= 6) return "(Significant)";
    if (level <= 8) return "(Severe)";
    return "(Extreme)";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Log Soreness</h2>
            <p className="text-sm text-gray-600">
              Track muscle soreness to get adaptive workout recommendations
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-start gap-2">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="text-sm text-blue-900">
              <span className="font-medium">Date: 25/12/2025</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body Part
            </label>
            <select
              value={selectedBodyPart}
              onChange={(e) => setSelectedBodyPart(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
            >
              <option value="">Select body part</option>
              {bodyParts.map((part) => (
                <option key={part} value={part}>
                  {part}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Soreness Level: {sorenessLevel}/10{" "}
              {getSorenessLabel(sorenessLevel)}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={sorenessLevel}
              onChange={(e) => setSorenessLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>None</span>
              <span>Severe</span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-gray-600">
              <p>• 1-2: Minimal soreness, ready to train</p>
              <p>• 3-4: Mild soreness, can train with caution</p>
              <p>• 5-6: Moderate soreness, consider lighter workout</p>
              <p>• 7-8: Significant soreness, rest or active recovery</p>
              <p>• 9-10: Severe soreness, rest required</p>
            </div>
          </div>

          <button className="w-full text-blue-600 hover:text-blue-700 font-medium py-2 text-sm">
            + Add Another Body Part
          </button>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Workout Modal Component
function WorkoutModal({ onClose }) {
  const [date, setDate] = useState("2025-12-25");
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState(60);
  const [intensity, setIntensity] = useState(5);

  const exercises = [
    "Running",
    "Cycling",
    "Swimming",
    "Weightlifting",
    "Yoga",
    "Soccer Practice",
    "Basketball",
    "Tennis",
    "HIIT",
    "Walking",
  ];

  const trainingLoad = duration * intensity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Log Workout</h2>
            <p className="text-sm text-gray-600">
              Track your training session to monitor load and prevent
              overtraining
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exercise/Activity
            </label>
            <select
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
            >
              <option value="">Select exercise type</option>
              {exercises.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Intensity: {intensity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Light</span>
              <span>Hard</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              1 = Very light · 5 = Moderate · 10 = Maximum effort
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-900 mb-1">
              Training Load: {trainingLoad}
            </div>
            <p className="text-xs text-gray-600">
              Duration × Intensity = Training Load
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
            >
              Save Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
