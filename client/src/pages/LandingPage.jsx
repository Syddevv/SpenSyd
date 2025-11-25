import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/LandingPage.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";

const LandingPage = () => {
  const navigate = useNavigate();

  // Stagger container for the bento grid
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <motion.div
          className="nav-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={SpenSyd_Icon} alt="SpenSyd Logo" />
          <span>SpenSyd</span>
        </motion.div>
        <motion.div
          className="nav-links"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="btn-text" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </motion.div>
      </nav>

      <header className="hero-section">
        <motion.span
          className="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          v2.0 Now Available
        </motion.span>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          Master Your Money.
          <br /> Build Your Future.
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          SpenSyd is the professional finance tracker designed for clarity.
          Track income, categorize expenses, and visualize your financial health
          in one dashboard.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.button
            className="btn-primary"
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Free Account
          </motion.button>
        </motion.div>
      </header>

      <section className="features-section">
        <motion.div
          className="bento-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="bento-item large glass-panel"
            variants={item}
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
            variants={item}
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
            variants={item}
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
            variants={item}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bento-icon">🎯</div>
            <h3 className="bento-title">Smart Categorization</h3>
            <p className="bento-desc">
              Automatically organize expenses into categories like Food,
              Transport, and Bills for better budgeting.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
