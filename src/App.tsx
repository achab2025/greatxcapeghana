
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Landing from "./pages/Landing";

// Import routes from separate files
import { adminRoutes } from "./routes/adminRoutes";
import { userRoutes } from "./routes/userRoutes";
import { sharedRoutes } from "./routes/sharedRoutes";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  const getDefaultRoute = () => {
    if (!isAuthenticated) {
      return "/landing";
    }
    if (userRole === "admin") {
      return "/admin-dashboard";
    }
    return "/user-dashboard";
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <div className="bg-slate-50 min-h-screen">
              <Routes>
                {/* Public Routes */}
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes (protected) */}
                {adminRoutes}
                
                {/* User Routes (protected) */}
                {userRoutes}
                
                {/* Shared Routes (based on user role) */}
                {sharedRoutes}
                
                {/* Default route - redirect based on authentication */}
                <Route 
                  path="/" 
                  element={<Navigate to={getDefaultRoute()} replace />}
                />
                
                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
