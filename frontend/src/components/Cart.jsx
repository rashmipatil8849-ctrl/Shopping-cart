import React, { useEffect, useState } from 'react';
import api from './api.js';

export default function Cart({ goBack }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  // Load cart
  const loadCart = async () => {
    try {
      const res = await api.get('/carts');
      setItems(res.data.items || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load cart');
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Checkout
  const checkout = async () => {
    try {
      await api.post('/orders');
      alert('Order placed successfully');
      goBack(); // back to items
    } catch (err) {
      alert('Checkout failed');
    }
  };

  // Calculate total
  const total = items.reduce((sum, i) => {
    if (!i.itemId) return sum;
    return sum + i.itemId.price * i.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Back to items */}
      <button
        onClick={goBack}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back to Items
      </button>

      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {error && <p className="text-red-600">{error}</p>}
      {items.length === 0 && <p>Your cart is empty</p>}

      {/* CART ITEMS */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded shadow p-4 flex items-center gap-4"
          >
            {/* IMAGE */}
            <img
              src={
                item.itemId?.image ||
                'https://via.placeholder.com/120?text=No+Image'
              }
              alt={item.itemId?.name}
              className="w-28 h-28 object-contain rounded"
              onError={(e) => {
                e.currentTarget.src =
                  'https://via.placeholder.com/120?text=No+Image';
              }}
            />

            {/* DETAILS */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {item.itemId?.name || 'Unknown Item'}
              </h3>
              <p className="text-gray-600">
                ₹{item.itemId?.price || 0}
              </p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL & CHECKOUT */}
      {items.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg mb-2">
            Total: ₹{total}
          </h3>
          <button
            onClick={checkout}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
