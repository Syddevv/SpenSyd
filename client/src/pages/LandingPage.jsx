import React from "react";
import "../styles/LandingPage.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <motion.div
        className="landing-container glass"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img src={SpenSyd_Icon} alt="SpenSyd Icon" className="landing-icon" />
        <h1 className="landing-title">
          <span className="typewriter">SpenSyd</span>
        </h1>
        <h2 className="landing-subtitle">Track your expenses effortlessly</h2>

        <div className="landing-buttons">
          <button
            className="btn register"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button className="btn login" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
