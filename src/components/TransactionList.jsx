import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import './TransactionList.css';

function TransactionList({ transactions }) {
  const [showAll, setShowAll] = useState(false);

  if (transactions.length === 0) {
    return (
      <div className="transactions-section">
        <h3 className="section-title">Recent Transactions</h3>
        <p className="no-transactions">No transactions yet</p>
      </div>
    );
  }

  const displayedTransactions = showAll 
    ? transactions 
    : transactions.slice(0, 3);

  return (
    <div className="transactions-section">
      <h3 className="section-title">Recent Transactions</h3>
      
      <ul className="transaction-list">
        {displayedTransactions.map((tx, index) => (
          <TransactionItem key={index} transaction={tx} />
        ))}
      </ul>
      
      {transactions.length > 3 && (
        <button 
          className="see-all-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `See All (${transactions.length})`}
        </button>
      )}
    </div>
  );
}

export default TransactionList;