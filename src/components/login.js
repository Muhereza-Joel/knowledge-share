import React, { Component } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Nav } from "react-bootstrap";

class Login extends Component {
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

  state = {
    email: "",
    password: "",
    username: "",
    rememberMe: false,
    errors: {
      email: "",
      password: "",
    },
    redirectToDashboard: false,
  };

  componentDidMount() {
    const storedFormValues =
      JSON.parse(localStorage.getItem("loginFormValues")) || {};
    const { errors, rememberMe, ...rest } = storedFormValues;
    this.setState({
      ...rest,
      rememberMe: Boolean(rememberMe),
    });
  }

  componentDidUpdate() {
    const { errors, redirectToDashboard, ...valuesToStore } = this.state; // Exclude errors from values to store
    localStorage.setItem("loginFormValues", JSON.stringify(valuesToStore));
  }

  handleChange = (e) => {
    const { name, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;

    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
        },
      }));
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!this.state.email.trim()) {
      errors.email = "Email is required";
    }

    if (!this.state.password.trim()) {
      errors.password = "Password is required";
    }

    const { email, password } = this.state;

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:3001/api/auth/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          mode: "cors",
        });

        const result = await response.json();

        if (response.ok) {

          if (result.success) {
            this.setState({ isLoggedIn: true });
            setTimeout(() => {
              this.setState({
                redirectToDashboard: true,
                username: result.username,
              });
            }, 2000)
          
          } 
        } else {
          alert("Login failed. Invalid credentials.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // Update the state with errors
    this.setState({ errors });
  };

  render() {
    const { errors, redirectToDashboard, username } = this.state;

    if (redirectToDashboard) {
      return <Navigate to={`/knowledge-share/${username}`} />;
    }

    return (
      <div style={this.style}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex mb-4">
            <h1 className="text-success">K</h1>
            <h1 className="text-info">S</h1>
          </div>
          <h3 className="text-dark mb-1"> KnowledgeShare</h3>
          <span className="text-dark mb-3">
            Uganda's Number One Agricultural Resource Center
          </span>
        </div>
        <Form className="card p-3" onSubmit={this.handleSubmit} noValidate>
          <h5 className="text-dark text-center mb-4">Login To Your Account</h5>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label className="text-dark">
              Username or Email address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter username or email"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.email}
              required
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-dark">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.password}
              required
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              name="rememberMe"
              label="Remember Me"
              onChange={this.handleChange}
              checked={this.state.rememberMe}
            />
          </Form.Group>

          <Button variant="secondary" type="submit" className="btn-sm">
            Login
          </Button>

          <Nav.Item className="d-flex align-items-center mt-3">
            If you don't have an account click
            <small>
              <Nav.Link href="/auth/register/" className="text-info px-2">
                here
              </Nav.Link>
            </small>
          </Nav.Item>

        </Form>
      </div>
    );
  }
}

export default Login;
