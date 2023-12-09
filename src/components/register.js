import React, { Component } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Nav } from "react-bootstrap";

class Register extends Component {
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
    localStorage.setItem("RegistrationFormValues", JSON.stringify(valuesToStore));
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
        const response = await fetch("http://localhost:3001/api/auth/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
          mode: "cors",
        });

        const data = await response.json();

        if (response.ok) {
          if (data.success) {
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
            }, 2000)
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
    const { errors, alert, redirectToLogin} = this.state;

    if(redirectToLogin){
      return <Navigate to="/auth/login/" />;
    }

    return (
      <div>
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
          <h5 className="text-dark text-center mb-4">
            Create your account
          </h5>

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

          <Button variant="secondary" type="submit" className="btn-sm">
            Register
          </Button>

          <Nav.Item className="d-flex align-items-center mt-3">
            You have an account click
            <small>
              <Nav.Link href="/auth/login/" className="text-info px-2">
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
