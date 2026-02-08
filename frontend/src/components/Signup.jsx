import React, { useState } from 'react';
import api from './api';

export default function Signup({ goToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await api.post('/users/signup', {
        username,
        password
      });

      alert('Signup successful. Please login.');
      goToLogin();
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Sign Up
        </button>

        <p
          onClick={goToLogin}
          className="text-center text-blue-600 mt-3 cursor-pointer"
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
