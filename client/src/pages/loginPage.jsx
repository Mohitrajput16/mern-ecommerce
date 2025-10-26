// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
  e.preventDefault();
  try {
    // Send login request to the backend
    // We can use '/api/auth/login' because of the proxy in vite.config.js
    const res = await axios.post('/api/auth/login', { email, password });

    // On success, dispatch the setCredentials action with the user data
    dispatch(setCredentials(res.data));

    // Redirect to the home page
    navigate('/');
  } catch (err) {
    console.error(err?.response?.data?.message || err.message);
    // We'll add a proper error message display later
  }
};

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div>
        New Customer? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;