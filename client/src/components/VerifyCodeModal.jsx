import { useState } from "react";
import CloseIcon from "../assets/close-btn.png";
import "../styles/VerifyCodeModal.css";

export const VerifyCodeModal = ({ onClose, onVerified, email }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyCode = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/verify-reset-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Invalid code");
      }

      onVerified();
    } catch (err) {
      setError("Something went wrong.");
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

        {error && <p className="errorText">{error}</p>}

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
