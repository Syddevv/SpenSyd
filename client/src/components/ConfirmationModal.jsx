import PasswordIcon from "../assets/password.png";
import "../styles/ConfirmationModal.css";

export const ConfirmationModal = ({ onClose, icon, text }) => {
  return (
    <div className="confirmationModalWrapper">
      <div className="modalContent">
        <img src={icon} alt="Password Icon" className="passIcon" />
        <p className="text">{text}</p>

        <div className="buttonsWrapper">
          <button className="cancelBTN" onClick={() => onClose()}>
            Cancel
          </button>
          <button className="confirmBTN">Confirm</button>
        </div>
      </div>
    </div>
  );
};
