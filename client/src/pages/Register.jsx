import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import VerificationModal from "../components/VerificationModal";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import "../styles/Login.css"; // Import base auth styles
import "../styles/Register.css"; // Import specific register overrides

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Verification Modal State
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [verifyError, setVerifyError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/send-code`, formData);
      if (res.data.success) {
        setPendingUser(formData);
        setShowVerifyModal(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code) => {
    try {
      const verifyRes = await axios.post(`${BASE_URL}/api/auth/verify-email`, {
        email: pendingUser.email,
        code,
      });

      if (verifyRes.data.success) {
        toast.success("Account created successfully! Please login.");
        navigate("/login");
      }
    } catch (err) {
      setVerifyError("Invalid or expired verification code");
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Visual */}
      <div className="auth-visual register-visual">
        <div className="visual-content">
          <img src={SpenSyd_Icon} alt="Logo" className="visual-logo" />
          <h1 className="visual-heading">Join the SpenSyd Community.</h1>
          <p className="visual-text">
            Start your journey towards financial freedom today. Create an
            account to access professional tracking tools.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-container">
        <motion.div
          className="auth-card glass-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Get started with your free account</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="input-field"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="name@company.com"
                value={formData.email}
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
                placeholder="Create a strong password"
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
              {loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Verification Modal */}
      {showVerifyModal && (
        <VerificationModal
          email={pendingUser?.email}
          onSubmitCode={handleVerify}
          onClose={() => setShowVerifyModal(false)}
          errorMessage={verifyError}
          clearError={() => setVerifyError("")}
        />
      )}
    </div>
  );
};

export default Register;
