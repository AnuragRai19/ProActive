import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Glass Effect */}
      <aside className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            ProActive
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {["Overview", "Workouts", "Recovery", "Settings"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-white">Pro Plan</h4>
            <p className="text-xs text-gray-400 mt-1">
              Upgrade for AI insights
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white/20"></div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Readiness Score */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <h3 className="text-gray-400 text-sm font-medium uppercase">
              Readiness Score
            </h3>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-bold text-green-400">85</span>
              <span className="text-sm text-gray-400 mb-2">/ 100</span>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 w-[85%]"></div>
            </div>
          </div>

          {/* Card 2: Training Load */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <h3 className="text-gray-400 text-sm font-medium uppercase">
              Acute Load
            </h3>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-bold text-blue-400">Low</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Optimal range for recovery.
            </p>
          </div>

          {/* Card 3: Injury Risk */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <h3 className="text-gray-400 text-sm font-medium uppercase">
              Injury Risk
            </h3>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-bold text-red-400">12%</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Knee stability is low today.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
