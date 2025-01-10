import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert, Container, Row, Col } from "reactstrap";
import "./Login.css"; // Custom CSS file

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === "admin@example.com" && password === "password123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container className="flex justify-content-center align-items-center vh-500">
      <Row>
        <Col xs="12" sm="8" md="6" lg="4">
          <div className="login-box shadow p-4">
            <h2 className="text-center mb-4">Login</h2>
            {isLoggedIn ? (
              <Alert color="success">Login Successful! Welcome back.</Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                {error && <Alert color="danger">{error}</Alert>}
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup check className="mb-3">
                  <Label check>
                    <Input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    Remember Me
                  </Label>
                </FormGroup>

                <Button type="submit" color="primary" block>
                  Login
                </Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
