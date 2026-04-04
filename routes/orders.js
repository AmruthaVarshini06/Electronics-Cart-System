const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// @POST /api/orders — place order
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ message: 'No items in order.' });

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      totalAmount
    });

    // Clear cart after order
    await User.findByIdAndUpdate(req.user._id, { cart: [] });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders/my — user's orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders — all orders (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @PUT /api/orders/:id/status — update status (admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
