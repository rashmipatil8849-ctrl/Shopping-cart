import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`px-4 py-3 rounded shadow-lg text-white flex items-center gap-3
          ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}
        `}
      >
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 font-bold hover:opacity-80"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
