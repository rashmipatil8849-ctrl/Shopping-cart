const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item'
        },
        quantity: Number
      }
    ],
    status: {
      type: String,
      default: 'placed'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
