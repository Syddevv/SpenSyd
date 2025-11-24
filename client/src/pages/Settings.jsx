import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

import "../styles/Settings.css";

// Modals
import { ConfirmationModal } from "../components/ConfirmationModal";
import { ChangePassModal } from "../components/ChangePassModal";
import { ChangeEmailModal } from "../components/ChangeEmailModal";
import { EditProfileModal } from "../components/EditProfileModal";
import { AboutUsModal } from "../components/AboutUsModal";
import { VerifyCodeModal } from "../components/VerifyCodeModal";
import { ForgotPassModal } from "../components/ForgotPassModal";

// Assets
import DefaultProfile from "../assets/default-profile.png";
import PasswordIcon from "../assets/password.png";
import GmailIcon from "../assets/gmail.png";
import LogoutIcon from "../assets/logout.png";
import AboutIcon from "../assets/about icon.png";
import ArrowIcon from "../assets/arrow icon.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout, token, setUser } = useAuth();

  // Modal States
  const [modalState, setModalState] = useState({
    password: false,
    email: false,
    logout: false,
    about: false,
    editProfile: false,
    changePassForm: false,
    changeEmailForm: false,
    verifyCode: false,
    forgotPass: false,
  });

  const toggleModal = (key, value) => {
    setModalState((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Verification Flow for Sensitive Actions
  const initVerification = async () => {
    if (!user?.email) return alert("No email found.");
    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/send-reset-code/logged-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
      const data = await res.json();
      if (data.success) {
        toggleModal("verifyCode", true);
        toggleModal("changePassForm", false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeVerified = async (code) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          code,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toggleModal("verifyCode", false);
        toggleModal("forgotPass", true);
      } else {
        alert(data.message || "Invalid code");
      }
    } catch (error) {
      alert("Error verifying code");
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">Account Settings</h2>
        <p className="settings-subtitle">
          Manage your profile and security preferences.
        </p>
      </div>

      {/* Profile Section */}
      <div className="profile-section glass-panel">
        <img
          src={user?.profilePicture || DefaultProfile}
          alt="Profile"
          className="profile-img-large"
        />
        <div className="profile-info-large">
          <h3>@{user?.username}</h3>
          <p>{user?.email}</p>
          <button
            className="btn-outline"
            style={{
              marginTop: "12px",
              padding: "8px 16px",
              fontSize: "0.85rem",
            }}
            onClick={() => toggleModal("editProfile", true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Settings List */}
      <div className="settings-grid">
        <div
          className="setting-item"
          onClick={() => toggleModal("password", true)}
        >
          <div className="setting-left">
            <div className="setting-icon-box">
              <img src={PasswordIcon} className="setting-icon" alt="pass" />
            </div>
            <div className="setting-text">
              <h4>Change Password</h4>
              <p>Update your account password</p>
            </div>
          </div>
          <img src={ArrowIcon} className="arrow-right" width={20} alt="arrow" />
        </div>

        <div
          className="setting-item"
          onClick={() => toggleModal("email", true)}
        >
          <div className="setting-left">
            <div className="setting-icon-box">
              <img src={GmailIcon} className="setting-icon" alt="email" />
            </div>
            <div className="setting-text">
              <h4>Change Email</h4>
              <p>Update your connected email address</p>
            </div>
          </div>
          <img src={ArrowIcon} className="arrow-right" width={20} alt="arrow" />
        </div>

        <div
          className="setting-item"
          onClick={() => toggleModal("about", true)}
        >
          <div className="setting-left">
            <div className="setting-icon-box">
              <img src={AboutIcon} className="setting-icon" alt="about" />
            </div>
            <div className="setting-text">
              <h4>About SpenSyd</h4>
              <p>Version info and developer credits</p>
            </div>
          </div>
          <img src={ArrowIcon} className="arrow-right" width={20} alt="arrow" />
        </div>

        <div
          className="setting-item"
          style={{ borderColor: "rgba(244, 63, 94, 0.3)" }}
          onClick={() => toggleModal("logout", true)}
        >
          <div className="setting-left">
            <div
              className="setting-icon-box"
              style={{ background: "rgba(244, 63, 94, 0.1)" }}
            >
              <img src={LogoutIcon} className="setting-icon" alt="logout" />
            </div>
            <div className="setting-text">
              <h4 style={{ color: "var(--danger)" }}>Logout</h4>
              <p>Sign out of your account</p>
            </div>
          </div>
          <img src={ArrowIcon} className="arrow-right" width={20} alt="arrow" />
        </div>
      </div>

      {/* --- Modals --- */}
      <AnimatePresence>
        {modalState.editProfile && (
          <div className="modalBackground">
            <EditProfileModal
              closeModal={() => toggleModal("editProfile", false)}
            />
          </div>
        )}

        {/* Confirmation Modals */}
        {modalState.password && (
          <div className="modalBackground">
            <ConfirmationModal
              onClose={() => toggleModal("password", false)}
              icon={PasswordIcon}
              text="Change Password?"
              onSubmit={() => {
                toggleModal("password", false);
                toggleModal("changePassForm", true);
              }}
            />
          </div>
        )}

        {modalState.email && (
          <div className="modalBackground">
            <ConfirmationModal
              onClose={() => toggleModal("email", false)}
              icon={GmailIcon}
              text="Change Email Address?"
              onSubmit={() => {
                toggleModal("email", false);
                toggleModal("changeEmailForm", true);
              }}
            />
          </div>
        )}

        {modalState.logout && (
          <div className="modalBackground">
            <ConfirmationModal
              onClose={() => toggleModal("logout", false)}
              icon={LogoutIcon}
              text="Are you sure you want to logout?"
              onSubmit={handleLogout}
            />
          </div>
        )}

        {/* Functional Modals */}
        {modalState.changePassForm && (
          <ChangePassModal
            onClose={() => toggleModal("changePassForm", false)}
            openModal={initVerification}
          />
        )}

        {modalState.changeEmailForm && (
          <ChangeEmailModal
            onClose={() => toggleModal("changeEmailForm", false)}
            user={user}
            token={token}
            onEmailChanged={(newEmail) => setUser({ ...user, email: newEmail })}
          />
        )}

        {modalState.verifyCode && (
          <VerifyCodeModal
            email={user.email}
            onVerified={handleCodeVerified}
            onClose={() => toggleModal("verifyCode", false)}
          />
        )}

        {modalState.forgotPass && (
          <div className="modalBackground">
            <div className="modalWrapper">
              <ForgotPassModal
                onClose={() => toggleModal("forgotPass", false)}
              />
            </div>
          </div>
        )}

        {modalState.about && (
          <AboutUsModal onClose={() => toggleModal("about", false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
