const { readTable, writeTable } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = 'users';

function getAllUsers() {
  return readTable(TABLE_NAME);
}

function getUserById(id) {
  const users = getAllUsers();
  return users.find(u => u.id === id);
}

function getUserByEmail(email) {
  const users = getAllUsers();
  return users.find(u => u.email === email);
}

function createUser(userData) {
  const users = getAllUsers();
  const newUser = {
    id: uuidv4(),
    email: userData.email,
    password_hash: userData.password_hash || '',
    credits_balance: userData.credits_balance || 5,
    plan_type: userData.plan_type || 'free',
    created_at: new Date().toISOString()
  };
  users.push(newUser);
  writeTable(TABLE_NAME, users);
  return newUser;
}

function updateUser(id, updates) {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  writeTable(TABLE_NAME, users);
  return users[index];
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser
};
