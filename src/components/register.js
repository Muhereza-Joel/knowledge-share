import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Nav } from "react-bootstrap";
import API_BASE_URL from "./appConfig";
import logo from "../assets/images/logo.png";

class Register extends Component {
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
    username: "",
    email: "",
    password: "",

    errors: {
      username: "",
      email: "",
      password: "",
    },

    alert: {
      show: false,
      type: "success",
      message: "",
    },
    redirectToLogin: false,
  };

  componentDidMount() {
    const storedFormValues =
      JSON.parse(localStorage.getItem("RegistrationFormValues")) || {};
    const { errors, redirectToLogin, ...rest } = storedFormValues;
    this.setState({
      ...rest,
    });
  }

  componentDidUpdate() {
    const { alert, ...valuesToStore } = this.state;
    localStorage.setItem(
      "RegistrationFormValues",
      JSON.stringify(valuesToStore)
    );
  }

  handleChange = (e) => {
    const { name, type } = e.target;
    const value = e.target.value;

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
    const errors = { ...this.state.errors };

    if (!value.trim()) {
      errors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required`;
    } else if (name === "email" && !this.validateEmail(value)) {
      errors.email = "Invalid email address";
    } else {
      errors[name] = "";
    }

    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));
  };

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!this.state.username.trim()) {
      errors.username = "Username is required";
    }

    if (!this.state.email.trim()) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(this.state.email)) {
      errors.email = "Invalid email address";
    }

    if (!this.state.password.trim()) {
      errors.password = "Password is required";
    }

    const { username, email, password } = this.state;

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
          mode: "cors",
        });

        const data = await response.json();

        if (response.ok) {
          if (!data.user || !data.user.errors) {
            // Redirect only if there are no errors in the response
            this.setState({
              alert: {
                show: true,
                type: "success",
                message: "Registration successful! redirecting...",
              },
            });

            setTimeout(() => {
              this.setState({
                redirectToLogin: true,
              });
            }, 2000);
          } else {
            // Handle errors from the backend response
            const backendErrors = data.user.errors;
            if (backendErrors.email) {
              errors.email = backendErrors.email;
            }
            if (backendErrors.username) {
              errors.username = backendErrors.username;
            }

            this.setState({
              alert: {
                show: true,
                type: "danger",
                message:
                  "Registration failed,please check the form for errors.",
              },
            });
          }
        } else {
          this.setState({
            alert: {
              show: true,
              type: "danger",
              message: data.message || "Registration failed.",
            },
          });
        }
      } catch (error) {
        console.error("Error during registration:", error);
        this.setState({
          alert: {
            show: true,
            type: "danger",
            message: "An error occurred during registration.",
          },
        });
      }
    }

    this.setState({ errors });
  };

  render() {
    const { errors, alert, redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/knowledge-share/auth/login/" />;
    }

    return (
      <div style={this.style}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex mb-4">
            <img src={logo} width={100} height={100} />
          </div>
          <h3 className="text-dark mb-1"> KnowledgeShare</h3>
          <span className="text-dark mb-3">
            Uganda's Number One Agricultural Resource Center
          </span>
        </div>
        <Form
          style={{ border: "1px solid #217537" }}
          className="card p-3"
          onSubmit={this.handleSubmit}
          noValidate
        >
          <h5 className="text-dark text-center mb-4">Create your account</h5>

          {alert.show && (
            <div className={`alert alert-${alert.type} p-1`} role="alert">
              <small>{alert.message}</small>
            </div>
          )}

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="text-dark">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.username}
              required
              style={{ border: "1px solid #217537" }}
            />
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-dark">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.email}
              required
              style={{ border: "1px solid #217537" }}
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
              style={{ border: "1px solid #217537" }}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </Form.Group>

          <Button variant="success" type="submit" className="btn-sm">
            Register
          </Button>

          <Nav.Item className="d-flex align-items-center mt-3">
            You have an account click
            <small>
              <Nav.Link
                href="/knowledge-share/auth/login/"
                className="text-info px-2"
              >
                here to login
              </Nav.Link>
            </small>
          </Nav.Item>
        </Form>
      </div>
    );
  }
}

export default Register;
