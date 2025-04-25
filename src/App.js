import "./bootstrap-5.0.2-dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router,Routes, Route, Navigate, useLocation} from "react-router-dom";
import Revisions from "./quiz/revisions";
import PlayIns from "./quiz/playIns";
import Begin from "./quiz/begin";
import Summary from "./quiz/summary";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthProvider"; // Ensure AuthProvider and AuthContext are correctly imported
import { useContext, useState, useEffect } from "react";
import { LanguageProvider } from "./context/translateApi"; // Adjust path if needed

function App() {
  const { auth } = useContext(AuthContext); // Get auth state from AuthContext
  return (
    <div className="App">
      <LanguageProvider>
      <Router>
        <Routes>
          {/* Conditional Routes Based on Authentication */}
          {auth ? (
            <>
              {/* Authenticated Routes */}
              <Route path="/" element={<Revisions />} />
              <Route path="/playIns" element={<PlayIns />} />
              <Route path="/playIns/begin" element={<Begin />} />
              <Route path="/PlayIns/summary" element={<Summary />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              {/* Non-Authenticated Routes */}
              <Route path="/" element={<Revisions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/playIns" element={<PlayIns />} />
              <Route path="/playIns/begin" element={<Begin />} />
              <Route path="/PlayIns/summary" element={<Summary />} />
              {/* Redirect other paths to / */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;