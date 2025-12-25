import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  // MOCK AUTH STATE: Change this to true/false to test different views
  // For today, the Login button will simply set this to true.
  const [session, setSession] = useState(false);

  const handleMockLogin = () => {
    setSession(true); // Pretend we logged in
  };

  const handleMockLogout = () => {
    setSession(false); // Pretend we logged out
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !session ? (
              <Auth onLogin={handleMockLogin} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            session ? (
              <Dashboard onLogout={handleMockLogout} />
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
