import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/alumni/login" replace />;
  if (user.isAdmin === true) return <Navigate to="/alumni/dashboard" replace />;
  if (user.isApproved !== true) return <Navigate to="/alumni/register" replace />;

  return children;
};

export default ProtectedRoute;