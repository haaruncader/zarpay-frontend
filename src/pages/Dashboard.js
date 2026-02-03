import { useEffect, useState } from "react";
import { getBalance, getTransactions } from "../api/api";
import "./Dashboard.css"; 

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);
  const email = "alice@test.com"; // TEMP – later from auth

  useEffect(() => {
    // Fetch balance
    getBalance(email)
      .then(data => setBalance(data.balance))
      .catch(err => {
        console.error(err);
        setError("Failed to load balance");
      });

    // Fetch transactions
    getTransactions(email)
      .then(data => setTransactions(data || []))
      .catch(err => {
        console.error(err);
        setError("Failed to load transactions");
      });
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  // Show only first 3 transactions unless "See All" is clicked
  const displayedTransactions = showAll 
    ? transactions 
    : transactions.slice(0, 3);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Wallet Dashboard</h2>
      
      {/* Balance Display */}
      <div className="balance-card">
        {balance === null ? (
          <p>Loading balance...</p>
        ) : (
          <h1 className="balance-amount">
            ZAR {balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </h1>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn btn-primary">Add Money</button>
        <button className="btn btn-secondary">Send Money</button>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <h3 className="section-title">Recent Transactions</h3>
        
        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions yet</p>
        ) : (
          <>
            <ul className="transaction-list">
              {displayedTransactions.map((tx, index) => {
                const isCredit = tx.type === 'CREDIT';
                const description = isCredit
                  ? (tx.from ? `From ${tx.from.split('@')[0]}` : 'Deposit')
                  : `To ${tx.to.split('@')[0]}`;
                
                return (
                  <li key={index} className="transaction-item">
                    <div className="transaction-info">
                      <span className="transaction-type">
                        {isCredit ? '📥' : '📤'} {tx.type}
                      </span>
                      <span className="transaction-desc">{description}</span>
                    </div>
                    <span className={`transaction-amount ${isCredit ? 'credit' : 'debit'}`}>
                      {isCredit ? '+' : '-'}ZAR {tx.amount.toFixed(2)}
                    </span>
                  </li>
                );
              })}
            </ul>
            
            {/* Show "See All" button if more than 3 transactions */}
            {transactions.length > 3 && (
              <button 
                className="see-all-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Less' : `See All (${transactions.length})`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;