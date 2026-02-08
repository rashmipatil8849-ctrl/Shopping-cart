import React from 'react';

export default function Navbar({
  cartCount = 0,
  openCart,
  openOrders,
  onLogout
}) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
        Shopping Cart
      </h1>

      {/* Actions */}
      <div className="flex gap-3 items-center">
        <button
          onClick={openCart}
          className="relative px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {openOrders && (
          <button
            onClick={openOrders}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Orders
          </button>
        )}

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
