// client/src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import axios from 'axios';

const Header = () => {
  // Get userInfo from the auth state in your Redux store
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // Call the backend logout endpoint
      await axios.post('/api/auth/logout');
      // Dispatch the logout action to clear the Redux state and localStorage
      dispatch(logout());
      // Redirect the user to the login page
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <header style={{ background: '#333', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          <h1>My E-Commerce App</h1>
        </Link>
      </div>
      <nav>
        <Link to="/cart" style={{ color: '#fff', marginRight: '1rem' }}>Cart</Link>
        {userInfo ? (
          // If user is logged in, show their name and a logout button
          <>
            <span>Welcome, {userInfo.name}!</span>
            <button onClick={logoutHandler} style={{ marginLeft: '1rem' }}>
              Logout
            </button>
          </>
        ) : (
          // If user is not logged in, show a sign in link
          <Link to="/login" style={{ color: '#fff' }}>Sign In</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;