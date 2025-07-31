import React, { useState } from "react";
import "../styles/ChangePassModal.css";
import CloseBTN from "../assets/close-btn.png";
import axios from "axios";
import { EnterEmailModal } from "./EnterEmailModal";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader"; // ✅ Make sure this is installed

export const ChangePassModal = ({ onClose, openModal }) => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPasswordFlow, setShowForgotPasswordFlow] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const showTemporaryError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 2000);
  };

  const handleSubmit = async () => {
    setError("");

    if (newPass !== confirmPass)
      return showTemporaryError("Passwords don't match");
    if (newPass.length < 6) return showTemporaryError("Min 6 characters");
    if (newPass === currentPass)
      return showTemporaryError("Must differ from current");

    setLoading(true);

    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: currentPass,
          newPassword: newPass,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Password updated!");
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1500);
    } catch (err) {
      setLoading(false);
      showTemporaryError(err.response?.data?.message || "Error occurred");
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
          onClose();
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
          <div className="inputWithToggle">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Current Password"
              value={currentPass}
              onChange={(e) => {
                setCurrentPass(e.target.value);
                setError("");
              }}
            />
            <span
              className="toggleText"
              onClick={() => setShowCurrent((prev) => !prev)}
            >
              {showCurrent ? "Hide" : "Show"}
            </span>
          </div>

          <div className="inputWithToggle">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
                setError("");
              }}
            />
            <span
              className="toggleText"
              onClick={() => setShowNew((prev) => !prev)}
            >
              {showNew ? "Hide" : "Show"}
            </span>
          </div>

          <div className="inputWithToggle">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
                setError("");
              }}
            />
            <span
              className="toggleText"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {error && (
          <p
            className="errorMsg"
            style={{ marginTop: "0px", color: "red", fontSize: "13px" }}
          >
            {error}
          </p>
        )}

        <button
          className="changePassBtn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "CHANGE PASSWORD"}
        </button>

        <div onClick={handleForgotPassword}>
          <p className="backToSettings">Forgot password?</p>
          <hr className="line" />
        </div>
      </div>
    </div>
  );
};
