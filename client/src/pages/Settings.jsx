import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Settings.css";
import Profile from "../components/Profile";
import PasswordIcon from "../assets/password.png";
import ArrowIcon from "../assets/arrow icon.png";
import GmailIcon from "../assets/gmail.png";
import LogoutIcon from "../assets/logout.png";
import AboutIcon from "../assets/about icon.png";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useAuth } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { ChangePassModal } from "../components/ChangePassModal";

const Settings = () => {
  const [showPassModal, setShowPassModal] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChangePassModal, setshowChangePassModal] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          <div
            className="settingControl"
            onClick={() => setShowPassModal(true)}
          >
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

          <div
            className="settingControl"
            onClick={() => setShowGmailModal(true)}
          >
            <div className="iconWrapper">
              <img src={GmailIcon} alt="Gmail Icon" className="gmailIcon" />
            </div>
            <p className="labels">Change Email Address</p>
            <img src={ArrowIcon} alt="Arrow" className="arrowIcon" />
          </div>
          <hr />

          <div
            className="settingControl"
            onClick={() => setShowLogoutModal(true)}
          >
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

        <div className="modalsContainer">
          {showPassModal && (
            <ConfirmationModal
              onClose={() => setShowPassModal(false)}
              icon={PasswordIcon}
              text={"Change password?"}
            />
          )}

          {showGmailModal && (
            <ConfirmationModal
              onClose={() => setShowGmailModal(false)}
              icon={GmailIcon}
              text={"Change email address?"}
            />
          )}

          {showLogoutModal && (
            <ConfirmationModal
              onClose={() => setShowLogoutModal(false)}
              icon={LogoutIcon}
              text={"Do you want to logout?"}
              onSubmit={() => handleLogout()}
            />
          )}

          {showChangePassModal && <ChangePassModal />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
