const { supabase } = require('../config/database');

const TABLE_NAME = 'transactions';

async function getAllTransactions() {
  const { data, error } = await supabase.from(TABLE_NAME).select('*');
  if (error) throw error;
  return data;
}

async function getTransactionById(id) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

async function getTransactionsByUserId(userId) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

async function createTransaction(transactionData) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([
      {
        user_id: transactionData.user_id,
        amount: transactionData.amount, // in cents
        credits_purchased: transactionData.credits_purchased,
        stripe_payment_id: transactionData.stripe_payment_id || null,
        status: transactionData.status || 'pending'
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateTransaction(id, updates) {
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
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  createTransaction,
  updateTransaction
};
