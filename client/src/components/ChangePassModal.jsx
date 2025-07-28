import React, { useState } from "react";
import "../styles/ChangePassModal.css";
import CloseBTN from "../assets/close-btn.png";
import axios from "axios";

export const ChangePassModal = ({ onClose }) => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (newPass !== confirmPass) {
      setError("New passwords do not match");
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
      onClose(); // or show a toast instead
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="changePassModalWrapper">
      <div className="changePassModalContent">
        <p className="modalTitle">CHANGE PASSWORD</p>
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
            onChange={(e) => setCurrentPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>

        {error && <p className="errorMsg">{error}</p>}
        {success && <p className="successMsg">{success}</p>}

        <button className="changePassBTN" onClick={handleSubmit}>
          CHANGE PASSWORD
        </button>
        <p className="backToSettings">Forgot password?</p>
        <hr className="line" />
      </div>
    </div>
  );
};
