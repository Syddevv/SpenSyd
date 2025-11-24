import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { EnterEmailModal } from "../components/EnterEmailModal";
import ClipLoader from "react-spinners/ClipLoader";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import "../styles/Login.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      if (res.data.success) {
        login(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Visual */}
      <div className="auth-visual">
        <div className="visual-content">
          <img src={SpenSyd_Icon} alt="Logo" className="visual-logo" />
          <h1 className="visual-heading">Welcome back to SpenSyd.</h1>
          <p className="visual-text">
            Your personal finance command center. Log in to track expenses,
            analyze your habits, and grow your wealth.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-container">
        <motion.div
          className="auth-card glass-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h2>Sign In</h2>
            <p>Enter your details to access your account</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email or Username</label>
              <input
                type="text"
                name="identifier"
                className="input-field"
                placeholder="name@example.com"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?
            <Link to="/register" className="auth-link">
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
