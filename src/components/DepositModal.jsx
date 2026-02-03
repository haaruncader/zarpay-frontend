import React, { useState } from 'react';
import './Modal.css';
import './ActionButtons.css';

function DepositModal({ isOpen, onClose, onDeposit }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    onDeposit(parseFloat(amount));
    setAmount(""); // Clear form
  };

  const handleClose = () => {
    setAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Money</h2>
        <p className="modal-description">Enter the amount you want to deposit</p>
        <input
          type="number"
          placeholder="Amount (ZAR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="modal-input"
          step="0.01"
          min="0"
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit} className="btn btn-primary">
            Deposit
          </button>
          <button onClick={handleClose} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepositModal;