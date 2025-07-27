import CloseBTN from "../assets/close-btn.png";
import "../styles/ChangeEmailModal.css";

export const ChangeEmailModal = ({ onClose }) => {
  return (
    <div className="changeEmailModalWrapper">
      <div className="changeEmailModalContent">
        <p className="modalTitle">CHANGE EMAIL ADDRESS</p>
        <img
          src={CloseBTN}
          alt="Close Button"
          className="closeButton"
          onClick={() => onClose()}
        />

        <input
          type="text"
          placeholder="New Email Address"
          className="newEmail"
        />

        <button className="changeEmailBTN">CHANGE EMAIL ADDRESS</button>
      </div>
    </div>
  );
};
