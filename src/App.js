import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import AskQuestion from "./components/askQuestion";
import Questions from "./components/questions";
import Tags from "./components/tags";
import QuestionDetails from "./components/questionDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/register/" element={<Register />} />
            <Route path="/auth/login/" element={<Login />} />
            <Route
              path="/knowledge-share/"
              element={<Dashboard username="muhereza-joel" />}
            />
            <Route
              path="/knowledge-share/:username/*"
              element={<Dashboard username="muhereza-joel" />}
            />
            <Route
              path="/knowledge-share/:username/questions/"
              element={<Questions username="muhereza-joel" />}

            />
            <Route
              path="/knowledge-share/:username/questions/:questionId"
              element={
                <QuestionDetails
                  username="muhereza-joel"
                  questionId={"242d4fef-354c-41fd-b5a1-f8eee9243d2c"}
                />
              }
            />
            <Route
              path="/knowledge-share/:username/questions/ask-question/"
              element={<AskQuestion username="muhereza-joel" />}
            />
            <Route
              path="/knowledge-share/:username/tags/"
              element={<Tags username="muhereza-joel" />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
