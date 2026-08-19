import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ allowedRole, children }) {
  const { user, loading } = useAuth() || {};
  const location = useLocation();

  // Wait for authentication state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b12] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-sm text-slate-400">
            Checking access...
          </p>
        </div>
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // User does not have the required role
  if (user.role !== allowedRole) {
    let redirectPath = '/citizen';

    if (user.role === 'ADMIN') {
      redirectPath = '/admin';
    } else if (user.role === 'AUTHORITY') {
      redirectPath = '/authority';
    }

    return <Navigate to={redirectPath} replace />;
  }

  // User has correct role
  return children;
}