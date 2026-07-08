const { supabase } = require('../config/database');

const TABLE_NAME = 'users';

async function getAllUsers() {
  const { data, error } = await supabase.from(TABLE_NAME).select('*');
  if (error) throw error;
  return data;
}

async function getUserById(id) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows returned
  return data || null;
}

async function getUserByEmail(email) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('email', email)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

async function createUser(userData) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([
      {
        email: userData.email,
        password_hash: userData.password_hash || '',
        credits_balance: userData.credits_balance || 5,
        plan_type: userData.plan_type || 'free'
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateUser(id, updates) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser
};
