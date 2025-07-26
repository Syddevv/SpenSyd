import "../styles/VerificationModal.css";
import React, { useState } from "react";
import GmailIcon from "../assets/gmail.png";
import CloseBtn from "../assets/close-btn.png";

const VerificationModal = ({ email, onSubmitCode, onClose }) => {
  const [code, setCode] = useState("");
  const handleSubmit = () => {
    if (code.trim().length === 0) return;
    onSubmitCode(code);
  };

  return (
    <div className="modalBackground">
      <div className="verificationModal">
        <img
          src={CloseBtn}
          alt="Close Button"
          className="closeBtn"
          onClick={onClose}
        />
        <img src={GmailIcon} alt="Gmail Icon" className="gmailIcon" />

        <div className="messageWrapper">
          <p className="message">Verification code was sent to:</p>
          <p className="userGmail">sydneysantos176@gmail.com</p>
        </div>

        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="codeInput"
        />

        <button className="submitCode" onClick={handleSubmit}>
          Submit Code
        </button>
      </div>
    </div>
  );
};

export default VerificationModal;
