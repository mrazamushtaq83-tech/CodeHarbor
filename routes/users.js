const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser
} = require('../models/userModel');

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id - Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users - Create a new user
router.post('/', async (req, res) => {
  try {
    const { email, password_hash, credits_balance, plan_type } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });

    // Check for duplicate email
    const existing = await getUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'User with this email already exists' });

    const user = await createUser({ email, password_hash, credits_balance, plan_type });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/users/:id - Update a user
router.patch('/:id', async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
