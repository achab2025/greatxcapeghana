
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Houses from "./pages/Houses";
import Bookings from "./pages/Bookings";
import Guests from "./pages/Guests";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import TopNavbar from "./components/layout/TopNavbar";
import UserNavbar from "./components/layout/UserNavbar";
import UserDashboard from "./pages/UserDashboard";

// Placeholder pages for new routes
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

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
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="bg-slate-50 min-h-screen">
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    <TopNavbar />
                    <div className="flex-grow">
                      <Index />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/user-dashboard" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    <UserNavbar />
                    <div className="flex-grow">
                      <UserDashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/bookings" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    {localStorage.getItem("userRole") === "user" ? <UserNavbar /> : <TopNavbar />}
                    <div className="flex-grow">
                      <Bookings />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/houses" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    {localStorage.getItem("userRole") === "user" ? <UserNavbar /> : <TopNavbar />}
                    <div className="flex-grow">
                      <Houses />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/guests" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    <TopNavbar />
                    <div className="flex-grow">
                      <Guests />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/payments" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    {localStorage.getItem("userRole") === "user" ? <UserNavbar /> : <TopNavbar />}
                    <div className="flex-grow">
                      <Payments />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/reports" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    <TopNavbar />
                    <div className="flex-grow">
                      <Reports />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/messages" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    {localStorage.getItem("userRole") === "user" ? <UserNavbar /> : <TopNavbar />}
                    <div className="flex-grow">
                      <Messages />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    {localStorage.getItem("userRole") === "user" ? <UserNavbar /> : <TopNavbar />}
                    <div className="flex-grow">
                      <Settings />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
