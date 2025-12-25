import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Note: These paths must match where you placed the files
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const [session, setSession] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !session ? (
              <Auth onLogin={() => setSession(true)} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            session ? (
              <Dashboard onLogout={() => setSession(false)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
