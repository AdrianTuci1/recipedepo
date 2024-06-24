import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  AuthContext from '../context/AuthContext';
interface Props {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    isAuthenticated && (roles ? roles.includes(user!.role) : true) ? (
      <Outlet /> 
    ) : (
      <Navigate to="/notallowed" replace /> 
    )
  );
};

export default ProtectedRoute;

