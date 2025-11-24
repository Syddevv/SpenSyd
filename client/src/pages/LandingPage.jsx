import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/LandingPage.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-logo">
          <img src={SpenSyd_Icon} alt="SpenSyd Logo" />
          <span>SpenSyd</span>
        </div>
        <div className="nav-links">
          <button className="btn-text" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      <header className="hero-section">
        <motion.span
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          v2.0 Now Available
        </motion.span>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Master Your Money.
          <br /> Build Your Future.
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          SpenSyd is the professional finance tracker designed for clarity.
          Track income, categorize expenses, and visualize your financial health
          in one dashboard.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Create Free Account
          </button>
        </motion.div>
      </header>

      <section className="features-section">
        <div className="bento-grid">
          <motion.div
            className="bento-item large glass-panel"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bento-icon">📊</div>
            <h3 className="bento-title">Real-time Analytics</h3>
            <p className="bento-desc">
              Visualize your spending habits with dynamic charts. See exactly
              where your money goes every month.
            </p>
          </motion.div>

          <motion.div
            className="bento-item glass-panel"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bento-icon">🛡️</div>
            <h3 className="bento-title">Secure & Private</h3>
            <p className="bento-desc">
              Your financial data is encrypted and secure. We prioritize your
              privacy above all else.
            </p>
          </motion.div>

          <motion.div
            className="bento-item glass-panel"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bento-icon">⚡</div>
            <h3 className="bento-title">Quick Actions</h3>
            <p className="bento-desc">
              Log transactions in seconds. Designed for speed so you never miss
              a record.
            </p>
          </motion.div>

          <motion.div
            className="bento-item large glass-panel"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bento-icon">🎯</div>
            <h3 className="bento-title">Smart Categorization</h3>
            <p className="bento-desc">
              Automatically organize expenses into categories like Food,
              Transport, and Bills for better budgeting.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
