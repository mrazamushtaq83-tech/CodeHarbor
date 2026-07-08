const { supabase } = require('../config/database');

const TABLE_NAME = 'images';

async function getAllImages() {
  const { data, error } = await supabase.from(TABLE_NAME).select('*');
  if (error) throw error;
  return data;
}

async function getImageById(id) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

async function getImagesByUserId(userId) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

async function createImage(imageData) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([
      {
        user_id: imageData.user_id,
        prompt_text: imageData.prompt_text,
        image_url: imageData.image_url || null,
        status: imageData.status || 'pending',
        model_used: imageData.model_used || 'replicate-default'
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateImage(id, updates) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

async function deleteImage(id) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);
  if (error) return false;
  return true;
}

module.exports = {
  getAllImages,
  getImageById,
  getImagesByUserId,
  createImage,
  updateImage,
  deleteImage
};
