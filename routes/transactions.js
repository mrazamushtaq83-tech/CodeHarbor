const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  createTransaction,
  updateTransaction
} = require('../models/transactionModel');

// GET /api/transactions - Get all transactions (optionally filter by user_id via query param)
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query;
    const transactions = user_id
      ? await getTransactionsByUserId(user_id)
      : await getAllTransactions();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/transactions/:id - Get a single transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/transactions - Create a new transaction (e.g. after Stripe payment)
router.post('/', async (req, res) => {
  try {
    const { user_id, amount, credits_purchased, stripe_payment_id, status } = req.body;
    if (!user_id || amount === undefined || credits_purchased === undefined) {
      return res.status(400).json({ error: 'user_id, amount, and credits_purchased are required' });
    }
    const transaction = await createTransaction({
      user_id,
      amount,
      credits_purchased,
      stripe_payment_id,
      status
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/transactions/:id - Update a transaction (e.g. set status to 'completed')
router.patch('/:id', async (req, res) => {
  try {
    const updated = await updateTransaction(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Transaction not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
