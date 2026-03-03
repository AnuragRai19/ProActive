import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./supabaseClient";

// Page Imports
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import LogWorkout from "./pages/LogWorkout";
import History from "./pages/History";
import AICoach from "./pages/AICoach";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for login/logout events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Prevent flicker while checking auth status
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading ProActive...
      </div>
    );
  }

  const userId = session?.user?.id;

  return (
    <Router>
      <Routes>
        {/* If logged in, send to Dashboard; otherwise show Auth */}
        <Route
          path="/"
          element={!session ? <Auth /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes: All now receive the critical userId prop */}
        <Route
          path="/dashboard"
          element={
            session ? <Dashboard userId={userId} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/log-workout"
          element={
            session ? <LogWorkout userId={userId} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/history"
          element={session ? <History userId={userId} /> : <Navigate to="/" />}
        />

        {/* 🚀 AI Coach now has the ID it needs to talk to Gemini */}
        <Route
          path="/ai-coach"
          element={session ? <AICoach userId={userId} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
