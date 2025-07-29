import React, { useState } from "react";
import "../styles/Login.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import { EnterEmailModal } from "../components/EnterEmailModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 1️⃣ Error state
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // clear previous error

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      // 2️⃣ Show message from server or fallback
      setErrorMessage(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div>
        <img src={SpenSyd_Icon} alt="SpenSyd Icon" className="login-icon" />
        <h1 className="pageName-login">SpenSyd</h1>
      </div>

      <div className="loginPage">
        <h2 className="description-login">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="email-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="email-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="password-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#aaa",
                  fontSize: "0.85rem",
                  userSelect: "none",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* 3️⃣ Error display */}
          {errorMessage && (
            <p
              style={{
                color: "red",
                marginTop: "0px",
                marginBottom: "0px",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              {errorMessage}
            </p>
          )}

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <div onClick={() => setShowEmailModal(true)}>
          <p className="forgotPass">Forgot password?</p>
          <hr className="underline" />
        </div>

        <p className="link-wrapper">
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span className="link">Register</span>
          </Link>
        </p>
      </div>

      <div>
        {showEmailModal && (
          <EnterEmailModal onClose={() => setShowEmailModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Login;
