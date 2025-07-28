import { useState } from "react";
import GmailIcon from "../assets/gmail.png";
import CloseIcon from "../assets/close-btn.png";
import "../styles/EnterEmailModal.css";
import { ForgotPassModal } from "./ForgotPassModal";
import { VerifyCodeModal } from "./VerifyCodeModal";

export const EnterEmailModal = ({ onClose, isLoggedIn = false }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);
  const [showVerifyCodeModal, setShowVerifyCodeModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleConfirmEmail = async () => {
    try {
      const endpoint = isLoggedIn
        ? "/api/auth/send-reset-code-logged-in"
        : "/api/auth/send-reset-code";

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(isLoggedIn && {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "No account found.");
      }

      // Save email temporarily
      localStorage.setItem("resetEmail", email);
      setUserEmail(email);
      setShowVerifyCodeModal(true);
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <>
      {showForgotPassModal && (
        <ForgotPassModal
          onClose={() => {
            setShowForgotPassModal(false);
            onClose();
          }}
          email={userEmail}
        />
      )}

      {showVerifyCodeModal && (
        <VerifyCodeModal
          onClose={() => setShowVerifyCodeModal(false)}
          onVerified={() => {
            setShowVerifyCodeModal(false);
            setShowForgotPassModal(true);
          }}
          email={userEmail}
          isLoggedIn={isLoggedIn}
        />
      )}

      {!showForgotPassModal && !showVerifyCodeModal && (
        <div className="enterEmailModalWrapper">
          <div className="enterEmailModalContent">
            <div>
              <img src={GmailIcon} alt="gmail-icon" className="gmail-icon" />
              <img
                src={CloseIcon}
                alt="close-icon"
                className="close-icon"
                onClick={onClose}
              />
            </div>

            <div className="inputContents">
              <p className="modalDescription">
                {isLoggedIn
                  ? "Enter your email to reset password"
                  : "Enter the email linked to your account"}
              </p>
              <input
                type="email"
                placeholder="you@example.com"
                className="emailInput"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
              {error && (
                <p className="errorText" style={{ textAlign: "center" }}>
                  {error}
                </p>
              )}
              <button
                className="confirmEmail"
                onClick={handleConfirmEmail}
                disabled={!email.includes("@")}
              >
                Confirm Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
