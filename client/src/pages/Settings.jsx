import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Settings.css";
import Profile from "../components/Profile";

const Settings = () => {
  return (
    <div className="settingsWrapper">
      <div>
        <NavBar />
      </div>

      <div className="profileWrapper">
        <Profile />
      </div>

      <div className="controls"></div>
    </div>
  );
};

export default Settings;
