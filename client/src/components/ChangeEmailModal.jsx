import React, { useState } from "react";
import CloseBTN from "../assets/close-btn.png";
import "../styles/ChangeEmailModal.css";
import GmailIcon from "../assets/gmail.png";

export const ChangeEmailModal = ({ onClose, user, token, onEmailChanged }) => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailCode, setNewEmailCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send code to current email
  const sendCurrentCode = async () => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:5000/api/auth/change-email/send-current-code",
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
    const res = await fetch(
      "http://localhost:5000/api/auth/change-email/verify-current-code",
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
    else alert("Invalid or expired code.");
  };

  // Step 3: Send code to new email
  const sendNewEmailCode = async () => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:5000/api/auth/change-email/send-new-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail }),
      }
    );
    setLoading(false);
    if ((await res.json()).success) setStep(4);
    else
      alert("Failed to send code to new email. Email may already be in use.");
  };

  // Step 4: Verify code from new email and update
  const verifyNewEmailCode = async () => {
    setLoading(true);
    const res = await fetch(
      "http://localhost:5000/api/auth/change-email/verify-new-code",
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
      alert("Email changed successfully!");
      onClose();
      window.location.reload(); // <-- Add this line
    } else {
      alert("Invalid or expired code.");
    }
  };

  React.useEffect(() => {
    if (step === 1) sendCurrentCode();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="changeEmailModalWrapper">
      <div className="changeEmailModalContent">
        <img
          src={CloseBTN}
          alt="Close"
          className="closeButton"
          onClick={onClose}
        />
        <img src={GmailIcon} alt="Gmail" className="gmailIcon" />
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
            />
            <button
              className="changeEmailBTN"
              onClick={verifyNewEmailCode}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Update"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
