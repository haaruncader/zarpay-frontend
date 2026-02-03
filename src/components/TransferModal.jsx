import React, { useState } from 'react';
import './Modal.css';
import './ActionButtons.css';

function TransferModal({ isOpen, onClose, onTransfer }) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!recipientEmail || !amount || parseFloat(amount) <= 0) {
      alert("Please fill in all fields");
      return;
    }
    onTransfer(recipientEmail, parseFloat(amount));
    setRecipientEmail("");
    setAmount("");
  };

  const handleClose = () => {
    setRecipientEmail("");
    setAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Send Money</h2>
        <p className="modal-description">Send money to another user</p>
        <input
          type="email"
          placeholder="Recipient email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="modal-input"
        />
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
          <button onClick={handleSubmit} className="btn btn-secondary">
            Send
          </button>
          <button onClick={handleClose} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransferModal;