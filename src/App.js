import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';

class App extends Component {
  
  render() {
    return (
      <Router>
        <div style={this.style}>
          <Routes>
            <Route
              path="/"
              element={
               <Login/>
              }
            />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
