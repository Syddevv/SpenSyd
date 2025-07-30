import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import axios from "axios";
import "../styles/Register.css";
import VerificationModal from "../components/VerificationModal";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000); // Clear after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/send-code", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        setPendingUser({ username, email, password });
        setShowModal(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleVerify = async (code) => {
    try {
      const verifyRes = await axios.post(
        "http://localhost:5000/api/auth/verify-email",
        {
          email: pendingUser.email,
          code,
        }
      );

      if (verifyRes.data.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert("Verification failed.");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Verification Failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div>
        <img src={SpenSyd_Icon} alt="SpenSyd Icon" className="register-icon" />
        <h1 className="pageName-register">SpenSyd</h1>
      </div>

      <div className="registerPage">
        <h2 className="description-register">Register</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="username-wrapper">
            <label htmlFor="username">Username</label>
            <input
              className="username-input"
              placeholder="Enter a username"
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
                placeholder="Create a password"
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

          <button className="register-button" type="submit">
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

      <div>
        {showModal && (
          <VerificationModal
            email={email}
            onSubmitCode={handleVerify}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
