import { useState } from "react";

export default function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    // In a real app, you would validate with Supabase here
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Left Side - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <svg
              className="w-7 h-7 text-blue-700"
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
            <h1 className="text-2xl font-bold text-white tracking-wide">
              ProActive
            </h1>
            <p className="text-blue-200 text-sm">Sports Injury Prevention</p>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Train Smarter,
            <br /> Not Harder.
          </h2>
          <p className="text-lg text-blue-100 max-w-md">
            The AI-powered assistant that monitors your training load and
            prevents injuries before they happen.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition cursor-default">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-white font-semibold text-sm">
                Real-time ACWR
              </h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition cursor-default">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="text-white font-semibold text-sm">AI Guidance</h3>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-200 text-sm">
          © 2025 ProActive. All rights reserved.
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
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
              <h1 className="text-2xl font-bold text-gray-900">ProActive</h1>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600">
              {isSignUp
                ? "Start your injury-free journey today."
                : "Sign in to access your training dashboard."}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white text-gray-900"
                placeholder="athlete@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white text-gray-900"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleSignIn}
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
            </span>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
