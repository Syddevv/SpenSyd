import { useState } from "react";
import "../styles/ForgotPassModal.css";
import CloseBTN from "../assets/close-btn.png";

export const ForgotPassModal = ({ onClose }) => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email; // or get from context

  const handleChangePassword = async () => {
    if (!newPass || newPass !== confirmPass) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, newPassword: newPass }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Password changed successfully. Check your email.");
        onClose();
      } else {
        alert(data.message || "Failed to reset password.");
      }
    } catch (err) {
      alert("Error updating password.");
    }
  };

  return (
    <div className="forgotPassModalWrapper">
      <div className="forgotPassModalContent">
        <p className="modalTitle">CHANGE PASSWORD</p>
        <img
          src={CloseBTN}
          alt="Close Button"
          className="closeButton"
          onClick={onClose}
        />

        <div className="passInputs">
          <input
            type="password"
            placeholder="New Password"
            className="newPass"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="confirmPass"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>

        <button className="changePassBTN" onClick={handleChangePassword}>
          CHANGE PASSWORD
        </button>
      </div>
    </div>
  );
};
