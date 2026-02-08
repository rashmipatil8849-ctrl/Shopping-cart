const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


const router = express.Router();

/**
 * SIGN UP
 * POST /api/users/register
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'All fields required' });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashed
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


/**
 * @route   POST /api/users
 * @desc    Register a new user
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // 2. Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // 3. Check if already logged in elsewhere
    if (user.token) {
      return res
        .status(403)
        .json({ message: 'You cannot login on another device.' });
    }

    // 4. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // 5. Generate JWT
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 6. Save token in DB (lock session)
    user.token = token;
    await user.save();

    // 7. Send response
    res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


/**
 * @route   POST /api/users/logout
 * @desc    Logout user (clear session token)
 * @access  Private
 */
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed' });
  }
});


module.exports = router;
