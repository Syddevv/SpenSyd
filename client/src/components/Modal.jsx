import React, { useState } from "react";
import "../styles/Modal.css";
import { toast } from "react-toastify";

const Modal = ({ title, onClose, onSubmit, categories, currentBalance }) => {
  const [category, setCategory] = useState(categories[0]?.toLowerCase() || "");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    if (!amount || !date) {
      toast.error("Please fill out all fields");
      return;
    }

    // Validation logic...
    if (
      (title === "New Expense" || title.toLowerCase().includes("expense")) &&
      parseFloat(amount) > currentBalance
    ) {
      toast.error("Not enough balance");
      return;
    }

    onSubmit({
      category,
      amount: parseFloat(amount),
      date,
    });

    onClose();
  };

  return (
    <div className="modalWrapper">
      {" "}
      {/* Using wrapper class from CSS for consistent styling */}
      <div className="topSection">
        <h3>{title}</h3>
        <button className="closeBtn" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="inputs">
        <div className="inputGroup">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="inputGroup">
          <label htmlFor="total">Amount</label>
          <input
            type="number"
            id="total"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="inputDate">Date</label>
          <input
            type="date"
            id="inputDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="saveBtn" onClick={handleSave}>
          Save Transaction
        </button>
      </div>
    </div>
  );
};

export default Modal;
