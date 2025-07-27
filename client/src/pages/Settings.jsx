import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Settings.css";
import Profile from "../components/Profile";
import PasswordIcon from "../assets/password.png";
import ArrowIcon from "../assets/arrow icon.png";
import GmailIcon from "../assets/gmail.png";
import LogoutIcon from "../assets/logout.png";
import AboutIcon from "../assets/about icon.png";

const Settings = () => {
  return (
    <div className="settingsWrapper">
      <div>
        <NavBar />
      </div>

      <div className="contents">
        <div className="profileWrapper">
          <Profile />
        </div>

        <div className="settingControlsWrapper">
          <div className="settingControl">
            <div className="iconWrapper">
              <img
                src={PasswordIcon}
                alt="Password Icon"
                className="passwordIcon"
              />
            </div>
            <p className="labels">Change Password</p>
            <img src={ArrowIcon} alt="Arrow" className="arrowIcon" />
          </div>
          <hr />

          <div className="settingControl">
            <div className="iconWrapper">
              <img src={GmailIcon} alt="Gmail Icon" className="gmailIcon" />
            </div>
            <p className="labels">Change Email Address</p>
            <img src={ArrowIcon} alt="Arrow" className="arrowIcon" />
          </div>
          <hr />

          <div className="settingControl">
            <div className="iconWrapper">
              <img src={LogoutIcon} alt="Logout Icon" className="logoutIcon" />
            </div>
            <p className="labels">Logout</p>
            <img src={ArrowIcon} alt="Arrow" className="arrowIcon" />
          </div>
          <hr />

          <div className="settingControl">
            <div className="iconWrapper">
              <img src={AboutIcon} alt="About Icon" className="aboutIcon" />
            </div>
            <p className="labels">About Us</p>
            <img src={ArrowIcon} alt="Arrow" className="arrowIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
