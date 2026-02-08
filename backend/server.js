const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Connect MongoDB
connectDB();

// CORS 
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://shopping-cart-app2026.netlify.app'
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/carts', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health check
app.get('/', (req, res) => {
  res.send('Shopping Cart API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
