

import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import WordPressGuide from './pages/WordPressGuide';
import Index from './pages/Index';
import Bookings from './pages/Bookings';
import Houses from './pages/Houses';
import Guests from './pages/Guests';
import Payments from './pages/Payments';
import Messages from './pages/Messages';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';
import UserDashboard from './pages/UserDashboard';
import CheckInOut from './pages/CheckInOut';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wordpress-guide" element={<WordPressGuide />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          {/* Admin routes */}
          <Route element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route path="/dashboard" element={<Index />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/checkinout" element={<CheckInOut />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* User routes */}
          <Route element={<UserLayout><Outlet /></UserLayout>}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
