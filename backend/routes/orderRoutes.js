const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Convert cart to order (checkout)
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    // 1. Find user's cart
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Create order from cart
    const order = new Order({
      userId: req.user._id,
      items: cart.items
    });

    await order.save();

    // 3. Clear cart after checkout
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    console.error('ORDER ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get order history for logged-in user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.itemId', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
