import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/register/" element={<Register />} />
            <Route path="/auth/login/" element={<Login />} />
            <Route path="/knowledge-share/" element={<Dashboard username="Muhereza-Joel"/>} />
            <Route path="/knowledge-share/:username/*" element={<Dashboard username="Muhereza-Joel"/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
