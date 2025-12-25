import { useState } from "react";

export default function Dashboard({ onLogout }) {
  const [soreness, setSoreness] = useState(5);

  // DUMMY DATA FOR UI TESTING
  const recentLogs = [
    { id: 1, date: "2023-12-24", activity: "5k Run", rpe: 8, load: 450 },
    { id: 2, date: "2023-12-22", activity: "Leg Day", rpe: 6, load: 300 },
  ];

  const riskScore = soreness > 7 ? "High" : "Low";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">ProActive</h1>
          <button
            onClick={onLogout}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Readiness Check UI */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">⚡ Readiness Check</h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                riskScore === "High"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              Risk: {riskScore}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            How sore are you feeling right now?
          </p>
          <input
            type="range"
            min="1"
            max="10"
            value={soreness}
            onChange={(e) => setSoreness(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm text-gray-600 border border-gray-200">
            {soreness > 7
              ? "⚠️ High soreness detected. Recovery advised."
              : "✅ Good to go!"}
          </div>
        </div>

        {/* Recent Logs UI */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3 px-1">Recent Activity</h3>
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {log.activity}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {log.date} • RPE: {log.rpe}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-blue-600">
                    {log.load}
                  </span>
                  <span className="text-[10px] text-gray-400">LOAD</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
