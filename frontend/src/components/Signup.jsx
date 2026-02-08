import React, { useState } from 'react';
import api from './api';

export default function Signup({ onSuccess, goToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      await api.post('/users/register', {
        username,
        password
      });

      alert('Signup successful. Please login.');
      goToLogin();

    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Sign Up
        </h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Sign Up
        </button>

        <p
          className="text-sm text-center mt-3 text-blue-600 cursor-pointer"
          onClick={goToLogin}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
