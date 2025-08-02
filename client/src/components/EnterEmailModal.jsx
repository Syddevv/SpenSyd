import { useState, useEffect } from "react";
import GmailIcon from "../assets/gmail.png";
import CloseIcon from "../assets/close-btn.png";
import "../styles/EnterEmailModal.css";
import { ForgotPassModal } from "./ForgotPassModal";
import { VerifyCodeModal } from "./VerifyCodeModal";
import { useAuth } from "../context/ContextProvider";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const EnterEmailModal = ({ onClose, isLoggedIn = false }) => {
  const { user } = useAuth(); // Get user from auth context
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);
  const [showVerifyCodeModal, setShowVerifyCodeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      setEmail(user.email);
      // Automatically send verification code for logged-in users
      handleSendCode(user.email);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSendCode = async (emailToVerify) => {
    setIsLoading(true);
    try {
      const endpoint = isLoggedIn
        ? "/api/auth/send-reset-code/logged-in"
        : "/api/auth/send-reset-code";

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(isLoggedIn && {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        },
        body: JSON.stringify({ email: emailToVerify }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Failed to send verification code.");
      }

      localStorage.setItem("resetEmail", emailToVerify);

      // First show the verify modal, THEN close the email modal
      setShowVerifyCodeModal(true);

      // For logged-in users, we can immediately hide the email content
      if (isLoggedIn) {
        setEmail(""); // Clear the email display
      }

      // Don't call onClose() here anymore
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmEmail = async () => {
    if (!email.includes("@")) {
      return setError("Please enter a valid email address");
    }
    await handleSendCode(email);
  };

  if (showForgotPassModal) {
    return (
      <ForgotPassModal
        onClose={() => {
          setShowForgotPassModal(false);
          onClose();
        }}
        email={email}
      />
    );
  }

  if (showVerifyCodeModal) {
    return (
      <VerifyCodeModal
        onClose={() => {
          setShowVerifyCodeModal(false);
          onClose(); // Only close parent modal when verify modal closes
        }}
        onVerified={() => {
          setShowVerifyCodeModal(false);
          setShowForgotPassModal(true);
        }}
        email={email}
      />
    );
  }

  // For logged-in users during loading/success
  if (isLoggedIn && (isLoading || showVerifyCodeModal)) {
    return (
      <div className="enterEmailModalWrapper">
        <div className="enterEmailModalContent">
          <div>
            <img src={GmailIcon} alt="gmail-icon" className="gmail-icon" />
            <img
              src={CloseIcon}
              alt="close-icon"
              className="close-icon"
              onClick={() => {
                setShowVerifyCodeModal(false);
                onClose();
              }}
            />
          </div>
          <div className="inputContents">
            {isLoading ? (
              <p style={{ textAlign: "center" }}>
                Sending verification code to {email}...
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // Original email input for non-logged-in users
  return (
    <div className="enterEmailModalWrapper">
      <motion.div
        className="enterEmailModalContent"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
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
            Enter the email linked to your account
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
            <p className="errorText" style={{ margin: "0px" }}>
              {error}
            </p>
          )}
          <button
            className="confirmEmail"
            onClick={handleConfirmEmail}
            disabled={!email.includes("@") || isLoading}
          >
            {isLoading ? "Sending..." : "Confirm Email"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
