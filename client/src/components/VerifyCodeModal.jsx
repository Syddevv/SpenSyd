import { useState } from "react";
import CloseIcon from "../assets/close-btn.png";
import "../styles/VerifyCodeModal.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const VerifyCodeModal = ({ onClose, onVerified, email }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyCode = async () => {
    setIsLoading(true);
    try {
      // Always get email from localStorage for consistency
      const verificationEmail = localStorage.getItem("resetEmail") || email;

      const res = await fetch(`${BASE_URL}/api/auth/verify-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add if logged in
        },
        body: JSON.stringify({
          email: verificationEmail,
          code,
        }),
      });

      const data = await res.json();
      console.log("Verification response:", data); // Debug log

      if (!res.ok) {
        throw new Error(data.message || "Invalid code");
      }

      onVerified();
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verifyCodeModalWrapper">
      <div className="verifyCodeModalContent">
        <img
          src={CloseIcon}
          alt="close-icon"
          className="close-icon"
          onClick={onClose}
        />
        <h2>Verify Your Email</h2>
        <p>We sent a verification code to {email}</p>

        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError("");
          }}
          maxLength={6}
        />

        {error && (
          <p className="errorText" style={{ color: "red" }}>
            {" "}
            {error}
          </p>
        )}

        <button
          onClick={handleVerifyCode}
          disabled={isLoading || code.length !== 6}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </div>
    </div>
  );
};
