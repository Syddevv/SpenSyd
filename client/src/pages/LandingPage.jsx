import React, { useState, useEffect } from "react"; // Import hooks
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/LandingPage.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";

const FeatureIcon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false); // State for scroll detection

  const handleScrollDown = () => {
    const featuresSection = document.querySelector(".features-section");
    featuresSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Added 'scrolled' class based on state */}
      <nav className={`landing-nav ${isScrolled ? "scrolled" : ""}`}>
        {/* Added wrapper to center content while background spans full width */}
        <div className="nav-content">
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
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </nav>

      <header className="hero-section">
        {/* ... rest of the component remains the same ... */}
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

        {!isScrolled && (
          <motion.button
            type="button"
            className="scroll-indicator"
            onClick={handleScrollDown}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
            }}
            aria-label="Scroll down to explore more content"
          >
            <span className="scroll-indicator__text">Explore More</span>
            <span className="scroll-indicator__icon">↓</span>
          </motion.button>
        )}
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
            className="bento-item full-width ai-feature glass-panel"
            variants={item}
            whileHover={{ scale: 1.01 }}
          >
            <div className="bento-icon">
              <FeatureIcon>
                <rect x="4" y="9" width="16" height="10" rx="3" />
                <path d="M12 4v3" />
                <circle
                  cx="9"
                  cy="13.5"
                  r="0.9"
                  fill="currentColor"
                  stroke="none"
                />
                <circle
                  cx="15"
                  cy="13.5"
                  r="0.9"
                  fill="currentColor"
                  stroke="none"
                />
                <path d="M9 16h6" />
              </FeatureIcon>
            </div>
            <div className="ai-content">
              <h3 className="bento-title">Powered by SpenSyd AI</h3>
              <p className="bento-desc">
                Your personal financial assistant is here. Ask complex questions
                like "How much did I spend on food last week?" or "What is my
                highest expense?" and get instant, intelligent answers.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bento-item large glass-panel"
            variants={item}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bento-icon">
              <FeatureIcon>
                <path d="M4 19V9" />
                <path d="M10 19V5" />
                <path d="M16 19v-7" />
                <path d="M22 19v-11" />
              </FeatureIcon>
            </div>
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
            <div className="bento-icon">
              <FeatureIcon>
                <path d="M12 3l7 3v5c0 4.5-2.9 7.9-7 10-4.1-2.1-7-5.5-7-10V6l7-3z" />
                <path d="M9.5 12.5l1.8 1.8 3.7-4.1" />
              </FeatureIcon>
            </div>
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
            <div className="bento-icon">
              <FeatureIcon>
                <path d="M13 2L5 14h5l-1 8 8-12h-5l1-8z" />
              </FeatureIcon>
            </div>
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
            <div className="bento-icon">
              <FeatureIcon>
                <circle cx="12" cy="12" r="7" />
                <circle cx="12" cy="12" r="3" />
                <path d="M16.5 7.5L21 3" />
                <path d="M15 9l6-6" />
              </FeatureIcon>
            </div>
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
