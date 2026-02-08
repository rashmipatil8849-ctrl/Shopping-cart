const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// CREATE item (PUBLIC)
router.post('/', async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({
        message: 'Name, price and image are required'
      });
    }

    const item = await Item.create({
      name,
      price,
      image
    });

    res.status(201).json(item);
  } catch (err) {
    console.error('ITEM CREATE ERROR:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
