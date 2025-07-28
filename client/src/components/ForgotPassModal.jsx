import { useState } from "react";
import "../styles/ForgotPassModal.css";
import CloseBTN from "../assets/close-btn.png";

export const ForgotPassModal = ({ onClose }) => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = localStorage.getItem("resetEmail");

  const handleChangePassword = async () => {
    if (newPass !== confirmPass) {
      return setError("Passwords do not match");
    }
    if (newPass.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, newPassword: newPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        return setError(data.message || "Failed to reset password");
      }

      localStorage.removeItem("resetEmail");
      onClose();
    } catch (err) {
      setError("Error updating password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgotPassModalWrapper">
      <div className="forgotPassModalContent">
        <p className="modalTop">CHANGE PASSWORD</p>
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
            onChange={(e) => {
              setNewPass(e.target.value);
              setError("");
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="confirmPass"
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && <p className="errorText">{error}</p>}

        <button
          className="changePassBTN"
          onClick={handleChangePassword}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "CHANGE PASSWORD"}
        </button>
      </div>
    </div>
  );
};
