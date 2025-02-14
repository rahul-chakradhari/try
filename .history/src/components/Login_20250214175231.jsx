import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(""); // State to show alert
  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const email = e.target.email.value; // Get email input value
    const password = e.target.password.value; // Get password input value

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // ✅ Pass only values, NOT event or elements
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.authToken); // ✅ Store token in localStorage
      window.location.href = "/"; // ✅ Redirect to home after login
    } else {
      alert(data.error || "Invalid credentials"); // ✅ Show error message
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      {/* Show success alert at the top */}
      {alert && <div className="alert alert-success mt-3">{alert}</div>}

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
