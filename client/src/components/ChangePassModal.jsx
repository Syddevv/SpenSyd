import React, { useState } from "react";
import "../styles/ChangePassModal.css";
import CloseBTN from "../assets/close-btn.png";
import axios from "axios";
import { EnterEmailModal } from "./EnterEmailModal";

export const ChangePassModal = ({ onClose, openModal }) => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForgotPasswordFlow, setShowForgotPasswordFlow] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (newPass !== confirmPass) {
      setError("New passwords do not match");
      return;
    }

    if (newPass.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: currentPass,
          newPassword: newPass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);
      // Auto-close after 2 seconds if successful
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordFlow(true);
  };

  if (showForgotPasswordFlow) {
    return (
      <EnterEmailModal
        onClose={() => {
          setShowForgotPasswordFlow(false);
          onClose(); // Close both modals if needed
        }}
        isLoggedIn={true}
      />
    );
  }

  return (
    <div className="changePassModalWrapper">
      <div className="changePassModalContent">
        <p className="modalTop">CHANGE PASSWORD</p>
        <img
          src={CloseBTN}
          alt="Close"
          className="closeButton"
          onClick={onClose}
        />

        <div className="passInputs">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPass}
            onChange={(e) => {
              setCurrentPass(e.target.value);
              setError("");
            }}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              setError("");
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && <p className="errorMsg">{error}</p>}
        {success && <p className="successMsg">{success}</p>}

        <button className="changePassBtn" onClick={handleSubmit}>
          CHANGE PASSWORD
        </button>

        <div onClick={handleForgotPassword}>
          <p className="backToSettings">Forgot password?</p>
          <hr className="line" />
        </div>
      </div>
    </div>
  );
};
