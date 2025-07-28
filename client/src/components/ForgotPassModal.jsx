import "../styles/ForgotPassModal.css";
import CloseBTN from "../assets/close-btn.png";

export const ForgotPassModal = () => {
  return (
    <div className="forgotPassModalWrapper">
      <div className="forgotPassModalContent">
        <p className="modalTitle">CHANGE PASSWORD</p>
        <img
          src={CloseBTN}
          alt="Close Button"
          className="closeButton"
          onClick={() => onClose()}
        />

        <div className="passInputs">
          <input type="text" placeholder="New Password" className="newPass" />
          <input
            type="text"
            placeholder="Confirm Password"
            className="confirmPass"
          />
        </div>

        <button className="changePassBTN">CHANGE PASSWORD</button>
      </div>
    </div>
  );
};
