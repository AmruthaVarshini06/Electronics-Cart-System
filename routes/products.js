const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

// @GET /api/products — get all with optional category & search
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let query = {};
    if (category && category !== 'all') query.category = category;
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    if (featured === 'true') query.isFeatured = true;
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/products — Admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @PUT /api/products/:id — Admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @DELETE /api/products/:id — Admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
