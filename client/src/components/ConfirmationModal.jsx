import "../styles/ConfirmationModal.css";

export const ConfirmationModal = ({ onClose, icon, text, onSubmit }) => {
  return (
    <div className="confirmationModalWrapper">
      <div className="confirmationModalContent">
        <img src={icon} alt="Password Icon" className="passIcon" />
        <p className="text">{text}</p>

        <div className="buttonsWrapper">
          <button className="cancelBTN" onClick={() => onClose()}>
            Cancel
          </button>
          <button className="confirmBTN" onClick={() => onSubmit()}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
