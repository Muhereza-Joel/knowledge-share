import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Nav } from "react-bootstrap";
import { isAuthenticated, login } from "../auth";
import Cookies from 'js-cookie';
import logo from "../assets/images/logo.png"

const Login = () => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    rememberMe: false,
    errors: {
      email: "",
      password: "",
    },
    redirectToDashboard: false,
  });

  useEffect(() => {
    const storedFormValues = JSON.parse(localStorage.getItem("loginFormValues")) || {};
    const { errors, rememberMe, ...rest } = storedFormValues;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...rest,
      rememberMe: Boolean(rememberMe),
    }));
  }, []);

  useEffect(() => {
    const { errors, redirectToDashboard, ...valuesToStore } = formData; // Exclude errors and redirectToDashboard from values to store
    localStorage.setItem("loginFormValues", JSON.stringify(valuesToStore));
  }, [formData]);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      errors: {
        ...prevFormData.errors,
        [name]: "",
      },
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    const { email, password } = formData;

    if (Object.keys(errors).length === 0) {
      const authenticationResult = await login(email, password);

      if (authenticationResult.username) {
        // Authentication successful
        setFormData((prevFormData) => ({
          ...prevFormData,
          isLoggedIn: true,
          username: authenticationResult.username,
        }));

        setTimeout(() => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            redirectToDashboard: true,
          }));
        }, 10);
      } else {
        // Authentication failed
        alert("Login failed. Invalid credentials.");
      }
    }

    // Update the state with errors
    setFormData((prevFormData) => ({
      ...prevFormData,
      errors,
    }));
  };

  if (formData.redirectToDashboard) {
    navigate(`/knowledge-share/${cookieData.USERNAME_KEY}`);
  } 
  return (
    <div style={style}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex mb-4">
          <img src={logo} width={100} height={100}/>
        </div>
        <h3 className="text-dark mb-1"> KnowledgeShare</h3>
        <span className="text-dark mb-3">
          Uganda's Number One Agricultural Resource Center
        </span>
      </div>
      <Form style={{border: "1px solid #217537"}} className="card p-3" onSubmit={handleSubmit} noValidate>
        <h5 className="text-dark text-center mb-4">Login To Your Account</h5>
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Label className="text-dark">
            Username or Email address
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter username or email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.email}
            required
            style={{border: "1px solid #217537"}}
          />
          {formData.errors.email && (
            <small className="text-danger">{formData.errors.email}</small>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-dark">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.password}
            required
            style={{border: "1px solid #217537"}}
          />
          {formData.errors.password && (
            <small className="text-danger">{formData.errors.password}</small>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="rememberMe"
            label="Remember Me"
            onChange={handleChange}
            checked={formData.rememberMe}
          />
        </Form.Group>

        <Button variant="success" type="submit" className="btn-sm">
          Login
        </Button>

        <Nav.Item className="d-flex align-items-center mt-3">
          If you don't have an account click
          <small>
            <Nav.Link href="/knowledge-share/auth/register/" className="text-info px-2">
              here
            </Nav.Link>
          </small>
        </Nav.Item>
      </Form>
    </div>
  );
};

const style = {
  backgroundColor: "#f6f9ff",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 1vmin)",
  color: "white",
};

export default Login;
