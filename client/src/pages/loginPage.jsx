// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import axios from 'axios';
import FormContainer from '../components/FormContainer'; // <-- Import

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
  e.preventDefault();
  
  // 1. Reset previous errors
  setValidationError('');

  // 2. Check for Empty Fields
  if (!email || !password) {
    setValidationError('Please fill in all fields');
    return; // Stop execution
  }

  // 3. Check Email Format (Regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setValidationError('Please enter a valid email address');
    return; // Stop execution
  }

  // 4. Proceed with API Call
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    dispatch(setCredentials(res.data));
    navigate('/');
  } catch (err) {
    // Handle Backend Errors (e.g., "Invalid password", "User not found")
    setValidationError(err?.response?.data?.message || err.message);
  }
};

  return (
    <FormContainer>
      <h1 className="text-3xl font-bold  mb-6 text-center text-gray-900">Sign In</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label 
            htmlFor="email" 
            className="block text-lg  font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block h-8 w-full rounded-sm border-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label 
            htmlFor="password" 
            className="block text-lg font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block h-8 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        {/* Add this inside your return JSX, typically above the submit button */}
{validationError && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    {validationError}
  </div>
)}
        <button 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          New Customer?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default LoginPage;