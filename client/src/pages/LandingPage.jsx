import React from "react";
import "../styles/LandingPage.css";
import SpenSyd_Icon from "../assets/SpenSyd Icon.png";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="body">
      <div className="landingPage">
        <img src={SpenSyd_Icon} alt="SpenSyd Icon" className="icon" />
        <h1 className="pageName">SpenSyd</h1>
        <h2 className="description">Track your expenses effortlessly</h2>

        <div className="buttons">
          <button className="registerBTN" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className="loginBTN" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
