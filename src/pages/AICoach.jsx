import { useState } from "react";
import { useNavigate } from "react-router-dom";
// 1. Import the API service
import { api } from "../services/api";
// 2. Import the new UI Component
import Card from "../components/Card";

export default function AICoach() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      const data = await api.getAiAdvice(query);

      if (data.status === "Success") {
        setResponses(data.data);
      } else {
        console.warn("AI returned unexpected status:", data);
      }
    } catch (error) {
      console.error("Error asking AI:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">
            🤖 AI Recovery Coach
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            ← Dashboard
          </button>
        </div>

        {/* Search Box */}
        <form onSubmit={handleAsk} className="mb-10">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="e.g., 'I have lower back pain' or 'Exercises for bigger biceps'"
              className="flex-1 p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-500 disabled:opacity-50 text-lg"
            >
              {loading ? "Thinking..." : "Ask Coach"}
            </button>
          </div>
        </form>

        {/* Results Area */}
        <div className="grid gap-6">
          {responses.map((item, index) => (
            <Card key={index} className="hover:border-blue-500 transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                <span
                  className={`px-3 py-1 rounded text-sm font-bold ${
                    item.type.includes("Stretch")
                      ? "bg-green-900 text-green-300"
                      : "bg-blue-900 text-blue-300"
                  }`}
                >
                  {item.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-400">
                <p>
                  💪 <strong>Muscle:</strong> {item.muscle}
                </p>
                <p>
                  🏋️ <strong>Equipment:</strong> {item.equipment}
                </p>
              </div>

              <div className="bg-gray-900 p-4 rounded text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                {item.description.replace(/Exercise:.*\n/, "").trim()}
              </div>
            </Card>
          ))}

          {responses.length === 0 && !loading && (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-xl">Describe your injury or goal above.</p>
              <p className="text-sm mt-2">
                The AI will search 2,000+ exercises to help you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
