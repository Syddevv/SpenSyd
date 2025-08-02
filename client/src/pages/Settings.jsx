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
import { ChangeEmailModal } from "../components/ChangeEmailModal";
import { EditProfileModal } from "../components/EditProfileModal";
import { ForgotPassModal } from "../components/ForgotPassModal";
import { VerifyCodeModal } from "../components/VerifyCodeModal";
import { AnimatePresence, motion } from "framer-motion";
import { AboutUsModal } from "../components/AboutUsModal";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Settings = () => {
  const [showPassModal, setShowPassModal] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChangePassModal, setshowChangePassModal] = useState(false);
  const [showChangeEmailModal, setshowChangeEmailModal] = useState(false);
  const [showEditProfileModal, setshowEditProfileModal] = useState(false);
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);
  const [showVerifyCodeModal, setShowVerifyCodeModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const navigate = useNavigate();
  const { logout, user, token, setUser } = useAuth(); // Make sure token and setUser are available
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangeEmail = () => {
    setshowChangeEmailModal(true);
    setShowGmailModal(false);
  };

  const handleChangePass = () => {
    setshowChangePassModal(true);
    setShowPassModal(false);
  };

  const openVerificationModal = async () => {
    if (!user?.email) return alert("No email found for this account.");

    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/send-reset-code/logged-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // Don't need to send email - backend gets it from token
          body: JSON.stringify({}),
        }
      );

      const data = await res.json();
      if (data.success) {
        setShowVerifyCodeModal(true);
        setshowChangePassModal(false);
      } else {
        alert(data.message || "Failed to send verification code.");
      }
    } catch (error) {
      alert("Error sending verification code.");
      console.error(error);
    }
  };

  const closeVerificationModal = () => {
    setShowVerifyCodeModal(false);
    setshowChangePassModal(false);
  };

  // In Settings.jsx
  const handleVerificationSuccess = async (code) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add auth token for logged-in flow
        },
        body: JSON.stringify({
          email: user.email,
          code,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowVerifyCodeModal(false);
        setShowForgotPassModal(true);
      } else {
        alert(data.message || "Invalid code");
      }
    } catch (error) {
      alert("Error verifying code");
    }
  };

  // When rendering the modal
  {
    showVerifyCodeModal && (
      <VerifyCodeModal
        email={user.email}
        onVerified={handleVerificationSuccess}
        onClose={() => closeVerificationModal()}
      />
    );
  }

  // When email is changed, update user context
  const handleEmailChanged = (newEmail) => {
    setUser({ ...user, email: newEmail });
  };

  return (
    <motion.div
      className="settingsWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <div>
          <NavBar />
        </div>

        <div className="contents">
          <motion.div
            className="profileWrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <Profile openModal={() => setshowEditProfileModal(true)} />
            </div>
          </motion.div>

          <motion.div
            className="settingControlsWrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
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
                  <img
                    src={LogoutIcon}
                    alt="Logout Icon"
                    className="logoutIcon"
                  />
                </div>
                <p className="labels">Logout</p>
                <img src={ArrowIcon} alt="Arrow" className="arrowIcon" />
              </div>
              <hr />

              <div
                className="settingControl"
                onClick={() => setShowAboutModal(true)}
              >
                <div className="iconWrapper">
                  <img src={AboutIcon} alt="About Icon" className="aboutIcon" />
                </div>
                <p className="labels">About SpenSyd</p>
                <img src={ArrowIcon} alt="Arrow" className="arrowIcon" />
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {showPassModal && (
              <motion.div
                className="modalBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modalWrapper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ConfirmationModal
                    onClose={() => setShowPassModal(false)}
                    icon={PasswordIcon}
                    text="Change password?"
                    onSubmit={handleChangePass}
                  />
                </motion.div>
              </motion.div>
            )}

            {showGmailModal && (
              <motion.div
                className="modalBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modalWrapper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ConfirmationModal
                    onClose={() => setShowGmailModal(false)}
                    icon={GmailIcon}
                    text="Change email address?"
                    onSubmit={handleChangeEmail}
                  />
                </motion.div>
              </motion.div>
            )}

            {showLogoutModal && (
              <motion.div
                className="modalBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modalWrapper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ConfirmationModal
                    onClose={() => setShowLogoutModal(false)}
                    icon={LogoutIcon}
                    text="Do you want to logout?"
                    onSubmit={handleLogout}
                  />
                </motion.div>
              </motion.div>
            )}

            {showChangePassModal && (
              <ChangePassModal
                onClose={() => setshowChangePassModal(false)}
                openModal={openVerificationModal}
              />
            )}

            {showChangeEmailModal && (
              <ChangeEmailModal
                onClose={() => setshowChangeEmailModal(false)}
                user={user}
                token={token}
                onEmailChanged={handleEmailChanged}
              />
            )}

            {showEditProfileModal && (
              <motion.div
                className="modalBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modalWrapper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <EditProfileModal
                    closeModal={() => setshowEditProfileModal(false)}
                  />
                </motion.div>
              </motion.div>
            )}

            {showForgotPassModal && (
              <motion.div
                className="modalBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modalWrapper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ForgotPassModal
                    onClose={() => setShowForgotPassModal(false)}
                  />
                </motion.div>
              </motion.div>
            )}

            {showAboutModal && (
              <AboutUsModal onClose={() => setShowAboutModal(false)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
