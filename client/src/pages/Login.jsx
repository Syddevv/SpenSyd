import React, { useState } from "react";
import "../styles/Login.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (req, res) => {
    try {
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

        <form action="" className="login-form">
          <div className="email-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" className="email-input" />
          </div>

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" className="password-input" />
          </div>

          <button className="login-button">Login</button>
        </form>

        <p className="link-reg-wrapper">
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span className="link-reg">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
