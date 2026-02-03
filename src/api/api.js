// Connects to the Spring Boot backend API using Axios
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Get wallet balance
export const getBalance = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/wallet/balance`, {
    params: { email }
  });
  return response.data;
};

// Get transactions
export const getTransactions = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/wallet/transactions`, {
    params: { email }
  });
  return response.data;
};

// Deposit money
export const deposit = async (email, amount) => {
  const response = await axios.post(`${API_BASE_URL}/deposit`, {
    email,
    amount
  });
  return response.data;
};

// Transfer money
export const transfer = async (fromEmail, toEmail, amount) => {
  const response = await axios.post(`${API_BASE_URL}/transfer`, {
    fromEmail,
    toEmail,
    amount
  });
  return response.data;
};