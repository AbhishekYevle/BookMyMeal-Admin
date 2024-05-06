import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;