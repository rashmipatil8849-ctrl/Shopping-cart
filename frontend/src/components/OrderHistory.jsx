import React, { useEffect, useState } from 'react';
import api from './api.js';

export default function OrderHistory({ goBack }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data || []))
      .catch(() => setError('Failed to load orders'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back */}
      <button
        onClick={goBack}
        className="mb-6 flex items-center gap-2 text-blue-600 font-semibold hover:underline"
      >
        ← Back to Items
      </button>

      <h2 className="text-2xl font-semibold mb-4">Order History</h2>

      {error && <p className="text-red-600">{error}</p>}
      {orders.length === 0 && <p>No orders placed yet</p>}

      {orders.map((order, index) => (
        <div
          key={order._id}
          className="bg-white p-4 mb-4 rounded shadow"
        >
          <p className="font-semibold">Order #{index + 1}</p>
          <p className="text-gray-600">
            Items: {order.items?.length || 0}
          </p>
          <p className="text-gray-600">
            Total: ₹{order.total || 0}
          </p>
        </div>
      ))}
    </div>
  );
}
