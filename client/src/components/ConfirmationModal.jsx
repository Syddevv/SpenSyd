import "../styles/ConfirmationModal.css";

export const ConfirmationModal = ({ onClose, icon, text, onSubmit }) => {
  return (
    <div className="confirmationModalWrapper">
      <div className="confirmationModalContent">
        <img src={icon} alt="Confirmation Icon" className="passIcon" />
        <p className="modalText">{text}</p>

        <div className="buttonsWrapper">
          <button className="modalButton cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modalButton confirm" onClick={onSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
