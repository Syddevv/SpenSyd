import React, { useState } from "react";
import "../styles/Login.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://spensyd-server.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="loginPage">
        <img src={SpenSyd_Icon} alt="SpenSyd Icon" className="login-icon" />
        <h1 className="pageName-login">SpenSyd</h1>
        <h2 className="description-login">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="email-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <p className="link-wrapper">
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span className="link">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
