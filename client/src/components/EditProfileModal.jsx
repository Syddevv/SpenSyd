import "../styles/EditProfileModal.css";
import CloseBTN from "../assets/close-btn.png";
import { useState } from "react";
import axios from "axios";
import fallbackImage from "../assets/default-profile.png";
import { useAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const EditProfileModal = ({ closeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }

    if (!token || !user || !user._id) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (selectedFile) formData.append("profilePicture", selectedFile);
    if (username) formData.append("username", username);

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

      closeModal();
      window.location.reload();
      toast.success("Profile updated sucessfully.");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="editProfileModalWrapper">
      <div className="editProfileModalContent">
        <p className="modalName">EDIT PROFILE</p>
        <img
          src={CloseBTN}
          alt="Close Button"
          className="closeButton"
          onClick={closeModal}
        />
        <img
          src={preview || user?.profilePicture || fallbackImage}
          alt="preview"
          className="profilePicModal"
        />
        <div className="fileUploadWrapper">
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="profilePicture" className="uploadButton">
            Update Picture
          </label>
        </div>

        <div className="usernameInput">
          <label htmlFor="profileUsername">Username</label>
          <input
            type="text"
            placeholder={`@ ${user.username}`}
            className="profileUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button
          className="confirmChangesBTN"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "SAVE CHANGES"}
        </button>
      </div>
    </div>
  );
};
