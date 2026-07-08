const { readTable, writeTable } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = 'images';

function getAllImages() {
  return readTable(TABLE_NAME);
}

function getImageById(id) {
  const images = getAllImages();
  return images.find(img => img.id === id);
}

function getImagesByUserId(userId) {
  const images = getAllImages();
  return images.filter(img => img.user_id === userId);
}

function createImage(imageData) {
  const images = getAllImages();
  const newImage = {
    id: uuidv4(),
    user_id: imageData.user_id,
    prompt_text: imageData.prompt_text,
    image_url: imageData.image_url || null,
    status: imageData.status || 'pending',
    model_used: imageData.model_used || 'replicate-default',
    created_at: new Date().toISOString()
  };
  images.push(newImage);
  writeTable(TABLE_NAME, images);
  return newImage;
}

function updateImage(id, updates) {
  const images = getAllImages();
  const index = images.findIndex(img => img.id === id);
  if (index === -1) return null;
  
  images[index] = { ...images[index], ...updates };
  writeTable(TABLE_NAME, images);
  return images[index];
}

function deleteImage(id) {
  let images = getAllImages();
  const initialLength = images.length;
  images = images.filter(img => img.id !== id);
  if (images.length === initialLength) return false;
  
  writeTable(TABLE_NAME, images);
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
