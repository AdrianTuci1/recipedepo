// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  const { isAuthenticated, roles } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const hasRequiredRole = requiredRoles?.some(role => roles.includes(role));
    
  if (!isAuthenticated || !hasRequiredRole) {
    return <Navigate to="/not-authorized" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;


