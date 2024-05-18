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
import Profile from "./components/profile";
import Cookies from 'js-cookie';
import Users from "./components/Users";
import QuestionsTagged from "./components/questionsTagged";
import MyQuestions from "./components/myQuestions";

const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/knowledge-share/auth/login/" state={{ from: path }} />
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const usernameFromCookie = cookieData.USERNAME_KEY

  useEffect(() => {
    setUsername(usernameFromCookie);
    setLoading(false);
  }, []);

  
  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/knowledge-share/auth/register/" element={<Register />} />
          <Route path="/knowledge-share/auth/login/" element={<Login />} />
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
            path="/knowledge-share/:username"
            element={
              <PrivateRoute element={<Dashboard username={username} />} />
            }
          />
          <Route
            path="/knowledge-share/:username/profile/"
            element={
              <PrivateRoute element={<Profile username={username} />} />
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
            path="/knowledge-share/:username/my-questions/"
            element={
              <PrivateRoute element={<MyQuestions username={username} />} />
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
            path="/knowledge-share/:username/tags/:tagId"
            element={<PrivateRoute element={<QuestionsTagged username={username} />} />}
          />
          <Route
            path="/knowledge-share/:username/calendar/"
            element={<PrivateRoute element={<Calender username={username} />} />}
          />
          <Route
            path="/knowledge-share/users/"
            element={<PrivateRoute element={<Users username={username} />} />}
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
