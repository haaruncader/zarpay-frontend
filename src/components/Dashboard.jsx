import { useEffect, useState } from "react";
import { getBalance, getTransactions, deposit, transfer } from "../api/api";
import BalanceCard from "./BalanceCard";
import ActionButtons from "./ActionButtons";
import TransactionList from "./TransactionList";
import DepositModal from "./DepositModal";
import TransferModal from "./TransferModal";
import "./Dashboard.css";

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const email = "alice@test.com"; // TEMP – later from auth

  // Modal states
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const fetchData = () => {
    getBalance(email)
      .then(data => setBalance(data.balance))
      .catch(err => {
        console.error(err);
        setError("Failed to load balance");
      });

    getTransactions(email)
      .then(data => setTransactions(data || []))
      .catch(err => {
        console.error(err);
        setError("Failed to load transactions");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeposit = async (amount) => {
    try {
      await deposit(email, amount);
      alert("Deposit successful!");
      setShowDepositModal(false);
      fetchData();
    } catch (err) {
      alert("Deposit failed: " + (err.response?.data || err.message));
    }
  };

  const handleTransfer = async (recipientEmail, amount) => {
    try {
      await transfer(email, recipientEmail, amount);
      alert("Transfer successful!");
      setShowTransferModal(false);
      fetchData();
    } catch (err) {
      alert("Transfer failed: " + (err.response?.data || err.message));
    }
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Wallet Dashboard</h2>
      
      <BalanceCard balance={balance} />
      
      <ActionButtons 
        onAddMoney={() => setShowDepositModal(true)}
        onSendMoney={() => setShowTransferModal(true)}
      />
      
      <TransactionList transactions={transactions} />

      <DepositModal 
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDeposit={handleDeposit}
      />

      <TransferModal 
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onTransfer={handleTransfer}
      />
    </div>
  );
}

export default Dashboard;