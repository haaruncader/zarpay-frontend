import React from 'react';
import './ActionButtons.css';

function ActionButtons({ onAddMoney, onSendMoney }) {
  return (
    <div className="action-buttons">
      <button className="btn btn-primary" onClick={onAddMoney}>
        Add Money
      </button>
      <button className="btn btn-secondary" onClick={onSendMoney}>
        Send Money
      </button>
    </div>
  );
}

export default ActionButtons;