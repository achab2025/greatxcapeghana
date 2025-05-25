
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (username: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Check if user is authenticated on initial load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("userRole");
    setIsAuthenticated(authStatus === "true");
    setUserRole(role);
  }, []);
  
  const login = async (username: string, password: string, role: string) => {
    let isValid = false;
    
    if (role === "user" && username === "user" && password === "user") {
      isValid = true;
    } else if (role === "admin" && username === "admin" && password === "admin") {
      isValid = true;
    } else if (role === "user" && username.startsWith("guest") && password.length === 8) {
      isValid = true;
    }
    
    if (isValid) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role);
      setIsAuthenticated(true);
      setUserRole(role);
      
      // Redirect based on role
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/user-dashboard");
      }
      
      return true;
    }
    return false;
  };
  
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login");
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
