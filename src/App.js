import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

class App extends Component {

  style = {
    backgroundColor: "#f6f9ff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 1vmin)",
    color: "white",
  };
  
  render() {
    return (
      <Router>
        <div style={this.style}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/register/" element={<Register />} />
            <Route path="/auth/login/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
