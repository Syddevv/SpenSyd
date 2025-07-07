import React, { useState } from "react";
import { Link } from "react-router-dom";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (req, res) => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="registerPage">
        <img src={SpenSyd_Icon} alt="SpenSyd Icon" className="login-icon" />
        <h1 className="pageName-login">SpenSyd</h1>
        <h2 className="description-login">Register</h2>

        <form action="" className="registration-form">
          <div className="username-wrapper">
            <label htmlFor="username">Username</label>
            <input type="email" className="username-input" />
          </div>

          <div className="email-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" className="email-input" />
          </div>

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" className="password-input" />
          </div>

          <button className="login-button">Register</button>
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
