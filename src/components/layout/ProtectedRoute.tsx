
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
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

  // If a specific role is required and user doesn't have it, redirect appropriately
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === "user") {
      return <Navigate to="/user-dashboard" replace />;
    } else if (userRole === "admin") {
      return <Navigate to="/" replace />;
    }
  }

  // Role-based redirects for root path
  if (location.pathname === "/" && userRole === "user") {
    return <Navigate to="/user-dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
