import { useState } from "react";

export default function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600">ProActive</h1>
          <p className="text-gray-500 mt-2">AI-Powered Injury Prevention</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
              placeholder="athlete@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={onLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            {isSignUp ? "Create Account (Demo)" : "Sign In (Demo)"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "New user? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
