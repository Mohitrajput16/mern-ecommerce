// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Get the user info from the auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in
  if (userInfo) {
    return <Outlet />; // Render the child route (e.g., ShippingPage)
  } else {
    return <Navigate to="/login" replace />; // Redirect to login
  }
};

export default ProtectedRoute;