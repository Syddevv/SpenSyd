import "../styles/ChangePassModal.css";
import CloseBTN from "../assets/close-btn.png";

export const ChangePassModal = () => {
  return (
    <div className="changePassModalWrapper">
      <div className="changePassModalContent">
        <p className="modalTitle">CHANGE PASSWORD</p>
        <img src={CloseBTN} alt="Close Button" className="closeButton" />

        <div className="passInputs">
          <input
            type="text"
            placeholder="Current Password"
            className="currentPass"
          />
          <input type="text" placeholder="New Password" className="newPass" />
          <input
            type="text"
            placeholder="Confirm Password"
            className="confirmPass"
          />
        </div>

        <button className="changePassBTN">CHANGE PASSWORD</button>
        <p className="backToSettings">Forgot password?</p>
        <hr className="line" />
      </div>
    </div>
  );
};
