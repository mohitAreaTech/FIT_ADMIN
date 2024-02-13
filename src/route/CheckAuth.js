import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './IsAuth.js';

const CheckAuth = () => {
  const checkToken = useSelector((state) => state.root.userDetails.access_token);
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />
}

export default CheckAuth