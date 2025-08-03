import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import { EnterEmailModal } from "../components/EnterEmailModal";
import { AnimatePresence, motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    setErrorMessage("");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        identifier,
        password,
      });

      if (res.data.success) {
        login(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <motion.div
      className="login-wrapper"
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
          <img src={SpenSyd_Icon} alt="SpenSyd Icon" className="login-icon" />
          <h1 className="pageName-login">SpenSyd</h1>
        </div>
      </motion.div>

      <motion.div
        className="loginPage"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="description-login">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="email-wrapper">
            <label htmlFor="identifier">Email or Username</label>
            <input
              type="text"
              className="email-input"
              placeholder="you@example.com or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
            {loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
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
      </motion.div>

      <div>
        <AnimatePresence>
          {showEmailModal && (
            <motion.div
              className="modalBackground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="modal-wrapper">
                <EnterEmailModal onClose={() => setShowEmailModal(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Login;
