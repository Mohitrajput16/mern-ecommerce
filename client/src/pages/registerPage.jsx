// client/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { setCredentials } from '../store/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
const navigate = useNavigate();

  const submitHandler = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    console.log('Passwords do not match'); // Add a user-facing alert later
  } else {
    try {
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      // Dispatch login action
      dispatch(setCredentials(res.data));

      // Redirect to home
      navigate('/');
    } catch (err) {
      console.error(err?.response?.data?.message || err.message);
    }
  }
};

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
        Have an Account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;