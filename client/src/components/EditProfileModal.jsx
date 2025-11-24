import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";
import "../styles/EditProfileModal.css";

// Assets
import CloseBTN from "../assets/close-btn.png";
import fallbackImage from "../assets/default-profile.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const EditProfileModal = ({ closeModal }) => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!user || !user._id) return;

    setLoading(true);
    const formData = new FormData();
    if (selectedFile) formData.append("profilePicture", selectedFile);
    if (username && username !== user.username)
      formData.append("username", username);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${BASE_URL}/api/auth/updateProfile/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local storage with new user data
      const updatedUser = {
        ...user,
        username: res.data.user?.username || user.username,
        profilePicture: res.data.user?.profilePicture || user.profilePicture,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");

      // Close modal and refresh to reflect changes
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile");
      setLoading(false);
    }
  };

  return (
    <div className="editProfileModalWrapper" onClick={closeModal}>
      {/* Stop propagation ensures clicking inside the modal doesn't close it */}
      <div
        className="editProfileModalContent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalHeader">
          <h3 className="modalTitle">Edit Profile</h3>
          <img
            src={CloseBTN}
            alt="Close"
            className="closeButton"
            onClick={closeModal}
          />
        </div>

        <div className="profile-upload-section">
          <div className="image-container">
            <img
              src={preview || user?.profilePicture || fallbackImage}
              alt="Profile Preview"
              className="profilePicModal"
            />
          </div>

          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="profilePicture" className="uploadButton">
            Change Photo
          </label>
        </div>

        <div className="form-section">
          <div className="usernameInput">
            <label htmlFor="profileUsername">Username</label>
            <input
              type="text"
              id="profileUsername"
              placeholder="Enter username"
              className="profileUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <button
          className="confirmChangesBTN"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};
