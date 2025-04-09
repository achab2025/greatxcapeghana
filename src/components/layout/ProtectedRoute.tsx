
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Ensure userRole is set if authenticated but somehow missing
  if (!userRole && isAuthenticated) {
    localStorage.setItem("userRole", "user"); // Default to user role if missing
  }

  return <>{children}</>;
};

export default ProtectedRoute;
