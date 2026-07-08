const express = require('express');
const router = express.Router();
const {
  getAllImages,
  getImageById,
  getImagesByUserId,
  createImage,
  updateImage,
  deleteImage
} = require('../models/imageModel');

// GET /api/images - Get all images (optionally filter by user_id via query param)
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query;
    const images = user_id ? await getImagesByUserId(user_id) : await getAllImages();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/images/:id - Get a single image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await getImageById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/images - Create a new image record
router.post('/', async (req, res) => {
  try {
    const { user_id, prompt_text, image_url, status, model_used } = req.body;
    if (!user_id || !prompt_text) {
      return res.status(400).json({ error: 'user_id and prompt_text are required' });
    }
    const image = await createImage({ user_id, prompt_text, image_url, status, model_used });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/images/:id - Update an image record (e.g. set image_url, update status)
router.patch('/:id', async (req, res) => {
  try {
    const updated = await updateImage(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Image not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/images/:id - Delete an image
router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteImage(req.params.id);
    if (!success) return res.status(404).json({ error: 'Image not found' });
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
