
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

  const currentUserRole = userRole || "user";

  // If a specific role is required and user doesn't have it, redirect appropriately
  if (requiredRole && currentUserRole !== requiredRole) {
    if (currentUserRole === "user") {
      return <Navigate to="/user-dashboard" replace />;
    } else if (currentUserRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
