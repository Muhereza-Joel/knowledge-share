import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import AskQuestion from "./components/askQuestion";
import Questions from "./components/questions";
import Tags from "./components/tags";
import QuestionDetailsContainer from "./components/questionDetailsContainer";
import { isAuthenticated } from "./auth";
import { AuthProvider, useAuth } from "./AuthContext";
import Calender from "./components/calender";

const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/auth/login/" state={{ from: path }} />
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/register/" element={<Register />} />
          <Route path="/auth/login/" element={<Login />} />
          <Route
            path="/logout"
            element={<Logout handleLogout={handleLogout} />}
          />
          <Route
            path="/knowledge-share/*"
            element={
              <PrivateRoute element={<Dashboard username={username} />} />
            }
          />
          <Route
            path="/knowledge-share/:username/*"
            element={
              <PrivateRoute element={<Dashboard username={username} />} />
            }
          />
          <Route
            path="/knowledge-share/:username/questions/*"
            element={
              <PrivateRoute element={<Questions username={username} />} />
            }
          />
          <Route
            path="/knowledge-share/:username/questions/:questionId"
            element={
              <PrivateRoute
                element={<QuestionDetailsContainer username={username} />}
              />
            }
          />
          <Route
            path="/knowledge-share/:username/questions/ask-question/"
            element={
              <PrivateRoute element={<AskQuestion username={username} />} />
            }
          />
          <Route
            path="/knowledge-share/:username/tags/"
            element={<PrivateRoute element={<Tags username={username} />} />}
          />
          <Route
            path="/knowledge-share/:username/calendar/"
            element={<PrivateRoute element={<Calender username={username} />} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const Logout = ({ handleLogout }) => {
  useEffect(() => {
    // Perform logout actions
    handleLogout();
  }, [handleLogout]);

  return <Navigate to="/" replace />;
};

export default App;
