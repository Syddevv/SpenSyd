import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        navigate("/login");
      }
      console.log("✅Registered:", res.data);
    } catch (error) {
      console.log("❌ Error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="registerPage">
        <img src={SpenSyd_Icon} alt="SpenSyd Icon" className="login-icon" />
        <h1 className="pageName-login">SpenSyd</h1>
        <h2 className="description-login">Register</h2>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="username-wrapper">
            <label htmlFor="username">Username</label>
            <input
              className="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="email-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit">
            Register
          </button>
        </form>

        <p className="link-wrapper">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span className="link">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
