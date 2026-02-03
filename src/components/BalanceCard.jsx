import React from 'react';
import './BalanceCard.css';

function BalanceCard({ balance }) {
  return (
    <div className="balance-card">
      {balance === null ? (
        <p>Loading balance...</p>
      ) : (
        <h1 className="balance-amount">
          ZAR {balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
        </h1>
      )}
    </div>
  );
}

export default BalanceCard;