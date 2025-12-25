import { useState } from "react";

export default function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Glass Container */}
      <div className="relative w-full max-w-md">
        {/* Decorative glow behind the card */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 overflow-hidden">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ProActive
            </h1>
            <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">
              Athlete Intelligence
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition"
                placeholder="athlete@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={onLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/30 transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "New user? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
