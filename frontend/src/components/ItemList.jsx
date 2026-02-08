import React, { useEffect, useState } from 'react';
import api from './api.js';
import Navbar from './Navbar.jsx';
import Toast from './Toast.jsx';

export default function ItemList({ openCart, openOrders,onLogout }) {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadItems();
    loadCartCount();
  }, []);

  const loadItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load items', err);
    }
  };

  const loadCartCount = async () => {
    try {
      const res = await api.get('/carts');
      const total = (res.data.items || []).reduce(
        (sum, i) => sum + i.quantity,
        0
      );
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  };

  const addToCart = async (itemId) => {
  try {
    await api.post('/carts', { itemId });
    setToast({ message: 'Item added to cart', type: 'success' });
    loadCartCount();
  } catch (err) {
    console.error(err.response?.data || err);
    setToast({ message: 'Failed to add item to cart', type: 'error' });
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
  cartCount={cartCount}
  openCart={openCart}
  openOrders={openOrders}
  onLogout={onLogout}   
/>


      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Items</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-4 rounded">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/300x300?text=Image+Unavailable';
                  }}
                />
              </div>

              {/* NAME */}
              <h3 className="font-semibold text-lg">{item.name}</h3>

              {/* PRICE */}
              <p className="text-gray-600 mt-1">₹{item.price}</p>

              {/* BUTTON */}
              <button
                onClick={() => addToCart(item._id)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
