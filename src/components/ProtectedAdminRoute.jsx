import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/admin" replace />;
  if (user.isAdmin !== true) return <Navigate to="/alumni/profile" replace />;
  if (user.isApproved !== true) return <Navigate to="/admin" replace />;

  return children;
};

export default ProtectedAdminRoute;

