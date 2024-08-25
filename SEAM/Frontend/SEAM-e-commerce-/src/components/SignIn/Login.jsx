import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from "../AxiosRequests/BaseUrl";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function LoginFunction() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginDetails;

    if (email.length === 0) {
      setErrors((prev) => {
        return {
          ...prev,
          email: "Email is required"
        };
      });
    } else if (password.length === 0) {
      setErrors((prev) => {
        return {
          ...prev,
          password: "Password is required"
        };
      });
    } else {
      try {
        const response = await axios.post("/login/", loginDetails);
        console.log(response);
        const accessToken = JSON.stringify(response.data.token.access)
        const refreshToken = JSON.stringify(response.data.token.refresh)

        localStorage.setItem("access_token", accessToken)
        localStorage.setItem("refresh_token", refreshToken)
        
        toast.success("Login successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Phone Number or password incorrect");
        } else if (error.response && error.response.status === 500) {
          toast.error("Something went wrong");
        } else {
          toast.error("Network error");
        }
      }
    }
  };

  return (
    <>
      <div className="container w-50 mt-5 shadow p-3">
        <ToastContainer />
        <h4 className="text-center fw-bold mt-4">Login Page</h4>
        <Form onSubmit={(e) => handleSubmit(e)} noValidate>
          <Form.Group className="mb-3 p-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={loginDetails.email}
            />
            <p className="text-danger">{errors.email}</p>
          </Form.Group>
          <Form.Group className="mb-3 p-4" controlId="formPlaintextPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={loginDetails.password}
            />
            <p className="text-danger">{errors.password}</p>
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Login
          </Button>
        </Form>
        <span className="text-center mt-5">
          Don't have an account? <Link to="/register">Click here</Link>
        </span>
      </div>
    </>
  );
}
