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
import VerificationModal from "../components/VerificationModal";

const Settings = () => {
  const [showPassModal, setShowPassModal] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChangePassModal, setshowChangePassModal] = useState(false);
  const [showChangeEmailModal, setshowChangeEmailModal] = useState(false);
  const [showEditProfileModal, setshowEditProfileModal] = useState(false);
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth();
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
        "http://localhost:5000/api/auth/send-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setShowVerificationModal(true); // only show if code sent successfully
      } else {
        alert(data.message || "Failed to send verification code.");
      }
    } catch (error) {
      alert("Error sending verification code.");
      console.error(error);
    }
  };

  const closeVerificationModal = () => {
    setShowVerificationModal(false);
    setshowChangePassModal(false);
  };

  const handleVerificationSuccess = async (code) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/verify-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user?.email, code }), // include user email
        }
      );

      const data = await res.json();
      if (data.success) {
        setShowVerificationModal(false);
        setshowChangePassModal(false);
        setShowForgotPassModal(true);
      } else {
        alert(data.message || "Invalid code");
      }
    } catch (error) {
      alert("Error verifying code");
    }
  };

  return (
    <div className="settingsWrapper">
      <div>
        <NavBar />
      </div>

      <div className="contents">
        <div className="profileWrapper">
          <Profile openModal={() => setshowEditProfileModal(true)} />
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
          {/* Confirmation Modal for Change Password */}
          {showPassModal && (
            <ConfirmationModal
              onClose={() => setShowPassModal(false)}
              icon={PasswordIcon}
              text={"Change password?"}
              onSubmit={() => handleChangePass()}
            />
          )}

          {/* Confirmation Modal for Change Email Address */}
          {showGmailModal && (
            <ConfirmationModal
              onClose={() => setShowGmailModal(false)}
              icon={GmailIcon}
              text={"Change email address?"}
              onSubmit={() => handleChangeEmail()}
            />
          )}

          {/* Confirmation Modal for Logout*/}
          {showLogoutModal && (
            <ConfirmationModal
              onClose={() => setShowLogoutModal(false)}
              icon={LogoutIcon}
              text={"Do you want to logout?"}
              onSubmit={() => handleLogout()}
            />
          )}

          {/* Modal for Change Password */}
          {showChangePassModal && (
            <ChangePassModal
              onClose={() => setshowChangePassModal(false)}
              openModal={() => openVerificationModal()}
            />
          )}

          {/* Modal for Change Email Address */}
          {showChangeEmailModal && (
            <ChangeEmailModal onClose={() => setshowChangeEmailModal(false)} />
          )}

          {/* Modal for Edit Profile */}
          {showEditProfileModal && (
            <EditProfileModal
              closeModal={() => setshowEditProfileModal(false)}
            />
          )}

          {/* Modal for Forgot Password */}
          {showForgotPassModal && (
            <ForgotPassModal onClose={() => setShowForgotPassModal(false)} />
          )}

          {/* Modal for Email Verification */}
          {showVerificationModal && (
            <VerificationModal
              email={user?.email} // dynamically from context
              onSubmitCode={handleVerificationSuccess}
              onClose={() => closeVerificationModal()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
