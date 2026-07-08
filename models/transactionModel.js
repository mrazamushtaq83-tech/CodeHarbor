const { readTable, writeTable } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = 'transactions';

function getAllTransactions() {
  return readTable(TABLE_NAME);
}

function getTransactionById(id) {
  const transactions = getAllTransactions();
  return transactions.find(t => t.id === id);
}

function getTransactionsByUserId(userId) {
  const transactions = getAllTransactions();
  return transactions.filter(t => t.user_id === userId);
}

function createTransaction(transactionData) {
  const transactions = getAllTransactions();
  const newTransaction = {
    id: uuidv4(),
    user_id: transactionData.user_id,
    amount: transactionData.amount, // in cents
    credits_purchased: transactionData.credits_purchased,
    stripe_payment_id: transactionData.stripe_payment_id || null,
    status: transactionData.status || 'pending',
    created_at: new Date().toISOString()
  };
  transactions.push(newTransaction);
  writeTable(TABLE_NAME, transactions);
  return newTransaction;
}

function updateTransaction(id, updates) {
  const transactions = getAllTransactions();
  const index = transactions.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  transactions[index] = { ...transactions[index], ...updates };
  writeTable(TABLE_NAME, transactions);
  return transactions[index];
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  createTransaction,
  updateTransaction
};
