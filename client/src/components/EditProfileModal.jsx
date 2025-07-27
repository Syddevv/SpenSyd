import "../styles/EditProfileModal.css";
import ProfilePic from "../assets/sung-jin-woo.jpg";
import CloseBTN from "../assets/close-btn.png";

export const EditProfileModal = ({ closeModal }) => {
  return (
    <div className="editProfileModalWrapper">
      <div className="editProfileModalContent">
        <p className="modalName">EDIT PROFILE</p>
        <img
          src={CloseBTN}
          alt="Close Button"
          className="closeButton"
          onClick={() => closeModal()}
        />

        <img
          src={ProfilePic}
          alt="Profile Picture"
          className="profilePicModal"
        />

        <button className="updateProfile">Update Picture</button>

        <div className="usernameInput">
          <label htmlFor="profileUsername">Username</label>
          <input type="text" placeholder="Syddu" className="profileUsername" />
        </div>

        <button className="confirmChangesBTN">SAVE CHANGES</button>
      </div>
    </div>
  );
};
