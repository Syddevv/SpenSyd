import React, { useState } from "react";
import CloseBTN from "../assets/close-btn.png";
import "../styles/ChangeEmailModal.css";
import GmailIcon from "../assets/gmail.png";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ChangeEmailModal = ({ onClose, user, token, onEmailChanged }) => {
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateEmail = async () => {
    setError("");

    if (!newEmail) {
      setError("Please enter a new email address");
      return;
    }
    if (!newEmail.includes("@")) {
      setError("Invalid email format");
      return;
    }
    if (newEmail === user.email) {
      setError("New email must be different from current");
      return;
    }

    setLoading(true);
    try {
      // Call the new direct update endpoint
      const res = await fetch(`${BASE_URL}/api/auth/change-email/direct`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Email updated successfully");
        onEmailChanged(newEmail); // Update parent state/context

        // Update local storage user object
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        storedUser.email = newEmail;
        localStorage.setItem("user", JSON.stringify(storedUser));

        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } else {
        setError(data.message || "Failed to update email");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="changeEmailModalWrapper" onClick={onClose}>
      <motion.div
        className="changeEmailModalContent"
        onClick={(e) => e.stopPropagation()}
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

        <p className="modalTitle">Change Email Address</p>
        <p className="modalDesc">Enter your new email address below.</p>

        <input
          type="email"
          placeholder="New Email Address"
          className="newEmail"
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
            setError("");
          }}
        />

        {error && (
          <p
            style={{
              color: "var(--danger)",
              marginTop: "0px",
              marginBottom: "10px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <button
          className="changeEmailBTN"
          onClick={handleUpdateEmail}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Update Email"}
        </button>
      </motion.div>
    </div>
  );
};
