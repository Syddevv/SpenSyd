import "../styles/Modal.css";

const Modal = ({ title, onClose, onSubmit, categories }) => {
  return (
    <div className="modalBackground">
      <div className="modalWrapper">
        <div className="modalContent">
          <div className="topSection">
            <h3>New Expense</h3>
            <button className="closeBtn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="inputs">
            <div className="inputGroup">
              <label htmlFor="category">Category</label>
              <select id="category" name="category">
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputGroup">
              <label htmlFor="total">Total</label>
              <input type="number" id="total" placeholder="PHP" />
            </div>

            <div className="inputGroup">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" />
            </div>

            <button className="saveBtn" onClick={onSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
