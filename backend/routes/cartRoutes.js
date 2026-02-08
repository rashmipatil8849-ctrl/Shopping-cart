const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/carts
 * @desc    Add item to cart
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: 'Item ID required' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [{ itemId, quantity: 1 }]
      });
    } else {
      const index = cart.items.findIndex(
        i => i.itemId.toString() === itemId
      );

      if (index > -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ itemId, quantity: 1 });
      }
    }

    await cart.save();
    res.json({ message: 'Item added to cart' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/carts
 * @desc    Get user cart (WITH IMAGES)
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
      .populate('items.itemId', 'name price image'); // ✅ FIXED

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/carts
 * @desc    Update item quantity
 * @access  Private
 */
router.put('/', auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || quantity < 1) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(
      i => i.itemId.toString() === itemId
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({ message: 'Quantity updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/carts/:itemId
 * @desc    Remove item from cart
 * @access  Private
 */
router.delete('/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      i => i.itemId.toString() !== itemId
    );

    await cart.save();
    res.json({ message: 'Item removed' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
