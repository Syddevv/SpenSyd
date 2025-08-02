import React, { useState, useEffect } from "react";
import CloseBTN from "../assets/close-btn.png";
import "../styles/ChangeEmailModal.css";
import GmailIcon from "../assets/gmail.png";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ChangeEmailModal = ({ onClose, user, token, onEmailChanged }) => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailCode, setNewEmailCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // Step 1: Send code to current email
  const sendCurrentCode = async () => {
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/api/auth/change-email/send-current-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    if ((await res.json()).success) setStep(2);
    else alert("Failed to send code to current email.");
  };

  // Step 2: Verify code from current email
  const verifyCurrentCode = async () => {
    setLoading(true);
    setErrorMessage("");
    const res = await fetch(
      `${BASE_URL}/api/auth/change-email/verify-current-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      }
    );
    setLoading(false);
    if ((await res.json()).success) setStep(3);
    else setErrorMessage("Invalid or expired code");
  };

  // Step 3: Send code to new email
  const sendNewEmailCode = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/api/auth/change-email/send-new-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newEmail }),
    });
    setLoading(false);
    if ((await res.json()).success) setStep(4);
    else setErrorMessage("Email in use. Try another.");
  };

  // Step 4: Verify code from new email and update
  const verifyNewEmailCode = async () => {
    setErrorMessage("");
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/api/auth/change-email/verify-new-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: newEmailCode }),
      }
    );
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      onEmailChanged(data.newEmail);
      toast.success("Email changed successfully");
      onClose();
      window.location.reload(); // <-- Add this line
    } else {
      setErrorMessage("Invalid or expired code");
    }
  };

  React.useEffect(() => {
    const delaySend = setTimeout(() => {
      if (step === 1) sendCurrentCode();
    }, 1000); // slight delay so UI renders first
    return () => clearTimeout(delaySend);
    // eslint-disable-next-line
  }, [step]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000); // Clear after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="changeEmailModalWrapper">
      <motion.div
        className="changeEmailModalContent"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <img
          src={CloseBTN}
          alt="Close"
          className="closeButton"
          onClick={onClose}
        />
        <img src={GmailIcon} alt="Gmail" className="gmailIcon" />

        {step === 1 && (
          <>
            <p className="modalTitle">Please Wait</p>
            <p className="modalDesc">
              We’re sending a code to <b>{user.email}</b>
            </p>
            {loading && <p className="modalLoadingText">Sending...</p>}
          </>
        )}

        {step === 2 && (
          <>
            <p className="modalTitle">Verify Your Current Email</p>
            <p className="modalDesc">
              A code was sent to <b>{user.email}</b>
            </p>
            <input
              type="text"
              placeholder="Enter code"
              className="codeInput"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {errorMessage && (
              <p
                style={{
                  color: "red",
                  marginTop: "0px",
                  marginBottom: "0px",
                  textAlign: "center",
                  fontSize: "15px",
                }}
              >
                {errorMessage}
              </p>
            )}
            <button
              className="changeEmailBTN"
              onClick={verifyCurrentCode}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <p className="modalTitle">Enter New Email</p>
            <input
              type="email"
              placeholder="New Email Address"
              className="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            {errorMessage && (
              <p
                style={{
                  color: "red",
                  marginTop: "0px",
                  marginBottom: "0px",
                  textAlign: "center",
                  fontSize: "15px",
                }}
              >
                {errorMessage}
              </p>
            )}
            <button
              className="changeEmailBTN"
              onClick={sendNewEmailCode}
              disabled={loading || !newEmail}
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </>
        )}
        {step === 4 && (
          <>
            <p className="modalTitle">Verify New Email</p>
            <p className="modalDesc">
              A code was sent to <b>{newEmail}</b>
            </p>
            <input
              type="text"
              placeholder="Enter code"
              className="codeInput"
              value={newEmailCode}
              onChange={(e) => setNewEmailCode(e.target.value)}
            />{" "}
            {errorMessage && (
              <p
                style={{
                  color: "red",
                  marginTop: "0px",
                  marginBottom: "0px",
                  textAlign: "center",
                  fontSize: "15px",
                }}
              >
                {errorMessage}
              </p>
            )}
            <button
              className="changeEmailBTN"
              onClick={verifyNewEmailCode}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Update"}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};
