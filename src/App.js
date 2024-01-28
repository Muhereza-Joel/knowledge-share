import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import AskQuestion from "./components/askQuestion";
import Questions from "./components/questions";
import Tags from "./components/tags";
import QuestionDetails from "./components/questionDetails";
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/auth/login/" state={{ from: path }} />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username') || null,
    };
  }
  render() {
    return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/register/" element={<Register />} />
          <Route path="/auth/login/" element={<Login />} />
          <Route
            path="/knowledge-share/*"
            element={
              <PrivateRoute
                element={<Dashboard username={this.state.username} />}
              />
            }
          />
          <Route
            path="/knowledge-share/:username/*"
            element={
              <PrivateRoute
                element={<Dashboard username={this.state.username} />}
              />
            }
          />
          <Route
            path="/knowledge-share/:username/questions/*"
            element={
              <PrivateRoute
                element={<Questions username={this.state.username} />}
              />
            }
          />
          <Route
            path="/knowledge-share/:username/questions/:questionId"
            element={
              <PrivateRoute
                element={
                  <QuestionDetails
                    username={this.state.username}
                    questionId={"242d4fef-354c-41fd-b5a1-f8eee9243d2c"}
                  />
                }
              />
            }
          />
          <Route
            path="/knowledge-share/:username/questions/ask-question/"
            element={
              <PrivateRoute
                element={<AskQuestion username={this.state.username} />}
              />
            }
          />
          <Route
            path="/knowledge-share/:username/tags/"
            element={
              <PrivateRoute element={<Tags username={this.state.username} />} />
            }
          />
        </Routes>
      </div>
    </Router>
    );
  }
}

export default App;
