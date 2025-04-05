
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

// Placeholder pages for new routes
import Rooms from "./pages/Rooms";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          
          <Route path="/bookings" element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          } />
          
          <Route path="/rooms" element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          } />
          
          <Route path="/houses" element={
            <ProtectedRoute>
              <Houses />
            </ProtectedRoute>
          } />
          
          <Route path="/guests" element={
            <ProtectedRoute>
              <Guests />
            </ProtectedRoute>
          } />
          
          <Route path="/payments" element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
