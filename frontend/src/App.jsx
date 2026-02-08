import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import ItemList from './components/ItemList.jsx';
import Cart from './components/Cart.jsx';
import Orders from './components/OrderHistory.jsx';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  const [page, setPage] = useState('items');
  const [authPage, setAuthPage] = useState('login');

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setAuthPage('login');
  };

  if (!loggedIn) {
    if (authPage === 'signup') {
      return (
        <Signup
          goToLogin={() => setAuthPage('login')}
        />
      );
    }

    return (
      <Login
        onSuccess={() => setLoggedIn(true)}
        goToSignup={() => setAuthPage('signup')}
      />
    );
  }

  if (page === 'cart') return <Cart goBack={() => setPage('items')} />;
  if (page === 'orders') return <Orders goBack={() => setPage('items')} />;

  return (
    <ItemList
      openCart={() => setPage('cart')}
      openOrders={() => setPage('orders')}
      onLogout={logout}
    />
  );
}
