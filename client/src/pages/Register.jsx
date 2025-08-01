import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import axios from "axios";
import "../styles/Register.css";
import VerificationModal from "../components/VerificationModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingCode, setLoadingCode] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState(false);

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
    setLoadingCode(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/send-code", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        setPendingUser({ username, email, password });
        setShowModal(true);
        setLoadingCode(false);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      setLoadingCode(false);
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
        toast.success("Account Created Successfully");
        navigate("/login");
      } else {
        toast.error("Invalid Verification");
      }
    } catch (err) {
      setModalErrorMessage("Invalid or expired code");
    }
  };

  return (
    <motion.div
      className="register-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <img
            src={SpenSyd_Icon}
            alt="SpenSyd Icon"
            className="register-icon"
          />
          <h1 className="pageName-register">SpenSyd</h1>
        </div>
      </motion.div>

      <motion.div
        className="registerPage"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
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
            {loadingCode ? "Please wait ..." : "Register"}
          </button>
        </form>

        <p className="link-wrapper">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span className="link">Login</span>
          </Link>
        </p>
      </motion.div>

      <div>
        {showModal && (
          <VerificationModal
            email={email}
            onSubmitCode={handleVerify}
            onClose={() => setShowModal(false)}
            errorMessage={modalErrorMessage}
            clearError={() => setModalErrorMessage("")}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Register;
