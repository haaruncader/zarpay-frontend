import React from 'react';
import './TransactionItem.css';

function TransactionItem({ transaction }) {
  const isCredit = transaction.type === 'CREDIT';
  const description = isCredit
    ? (transaction.from ? `From ${transaction.from.split('@')[0]}` : 'Deposit')
    : `To ${transaction.to.split('@')[0]}`;
  
  // Format date and time
  const date = new Date(transaction.timestamp);
  const formattedDate = date.toLocaleDateString('en-ZA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <li className="transaction-item">
      <div className="transaction-left">
        <div className="transaction-icon">
          {isCredit ? '💰' : '💸'}
        </div>
        <div className="transaction-info">
          <div className="transaction-type-line">
            <span className="transaction-type">{transaction.type}</span>
          </div>
          <span className="transaction-desc">{description}</span>
          <span className="transaction-datetime">
            {formattedDate} • {formattedTime}
          </span>
          <span className="transaction-balance">
            Balance after: ZAR {transaction.balanceAfter?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <span className={`transaction-amount ${isCredit ? 'credit' : 'debit'}`}>
        {isCredit ? '+' : '-'}ZAR {transaction.amount.toFixed(2)}
      </span>
    </li>
  );
}

export default TransactionItem;