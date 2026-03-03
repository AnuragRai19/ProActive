import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { api } from "../services/api";

const AICoach = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    const fetchCoachAdvice = async () => {
      try {
        setLoading(true);
        const result = await api.getAIAnalysis(userId);
        if (result.status === "success") {
          setData(result.data);
        } else {
          throw new Error(result.message || "Failed to get advice");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchCoachAdvice();
  }, [userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatLoading(true);
    const userMessage = chatInput;
    setChatInput("");

    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // 🚀 The API now returns a Gemini-generated string under 'answer'
      const response = await api.getAiAdvice(userMessage);

      if (response.status === "Success") {
        // We take the 'answer' key directly as it's now a Gemini string
        const aiResponseText =
          response.answer || "I'm sorry, I couldn't process that request.";
        setChatHistory((prev) => [
          ...prev,
          { role: "coach", content: aiResponseText },
        ]);
      } else {
        throw new Error(response.message || "Chat error");
      }
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "coach",
          content:
            "The AI Coach is currently offline. Please check your backend terminal.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-bold tracking-widest animate-pulse text-sm uppercase">
            ProActive AI Analyzing...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] py-8 px-4 text-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 1. Analysis Card */}
        <div className="overflow-hidden rounded-3xl shadow-2xl bg-slate-800 border border-slate-700">
          <div
            className={`p-8 text-white ${
              data?.acwr > 1.5
                ? "bg-linear-to-br from-red-600 to-orange-500"
                : "bg-linear-to-br from-emerald-600 to-teal-500"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase">
                  AI Coach Analysis
                </h2>
                <p className="opacity-80 text-xs mt-1 font-semibold uppercase tracking-widest">
                  Sprint 2: Load Monitoring
                </p>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border border-white/20">
                Live Data
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="bg-black/20 p-5 rounded-2xl backdrop-blur-xl border border-white/10">
                <p className="text-[10px] font-bold uppercase opacity-60 mb-1">
                  Workload Ratio (ACWR)
                </p>
                <p className="text-4xl font-mono font-black">
                  {data?.acwr || "0.00"}
                </p>
              </div>
              <div className="bg-black/20 p-5 rounded-2xl backdrop-blur-xl border border-white/10">
                <p className="text-[10px] font-bold uppercase opacity-60 mb-1">
                  Injury Risk Level
                </p>
                <p className="text-xl font-bold leading-tight">
                  {data?.risk_level || "Calculating..."}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
              Coach's Perspective
            </h3>
            <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed text-sm">
              <ReactMarkdown>{data?.ai_coach_advice}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* 2. Interactive Chat */}
        <div className="bg-slate-800/50 rounded-3xl shadow-2xl p-6 border border-slate-700 flex flex-col h-137.5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-blue-400 font-black text-sm tracking-widest flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping"></span>
              ASK YOUR COACH
            </h3>
            <button
              onClick={() => setChatHistory([])}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase"
            >
              Clear Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
            {chatHistory.length === 0 && (
              <div className="h-full flex items-center justify-center text-center p-10">
                <p className="text-slate-500 text-xs uppercase tracking-widest leading-loose">
                  Ask about specific exercises, recovery stretches, <br /> or
                  how to manage your ACWR score.
                </p>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-700 text-slate-200 rounded-bl-none border border-slate-600"
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-slate-700 w-16 h-8 rounded-full flex items-center justify-center">
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="relative group">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="How can I lower my ACWR safely?"
              className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
            />
            <button
              disabled={chatLoading}
              className="absolute right-3 top-3 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-900/20"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
