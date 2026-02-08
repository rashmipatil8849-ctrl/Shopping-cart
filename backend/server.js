const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// ROUTES
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// CREATE APP FIRST
const app = express();

// CONNECT DB
connectDB();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

// ROOT TEST
app.get('/', (req, res) => {
  res.send('Shopping Cart API Running');
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
