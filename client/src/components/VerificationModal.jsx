import "../styles/VerificationModal.css";
import React, { useEffect, useState } from "react";
import GmailIcon from "../assets/gmail.png";
import CloseBtn from "../assets/close-btn.png";

const VerificationModal = ({
  email,
  onSubmitCode,
  onClose,
  errorMessage,
  clearError,
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    if (code.trim().length === 0) return;
    onSubmitCode(code);
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearError();
      }, 2000); // Clear after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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
          <div className="codeSent">
            <p className="message">Verification code was sent to:</p>
            <p className="userGmail">{email}</p>

            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="codeInput"
            />

            {errorMessage && (
              <p
                style={{
                  color: "red",
                  marginTop: "0px",
                  marginBottom: "10px",
                  textAlign: "center",
                  fontSize: "13px",
                }}
              >
                {errorMessage}
              </p>
            )}

            <button className="submitCode" onClick={handleSubmit}>
              Submit Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
