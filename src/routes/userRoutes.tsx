
import React from 'react';
import { Route } from 'react-router-dom';
import UserLayout from '@/components/layout/UserLayout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

// Pages
import UserDashboard from '@/pages/UserDashboard';
import Houses from '@/pages/Houses';
import Bookings from '@/pages/Bookings';
import Payments from '@/pages/Payments';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';

export const userRoutes = [
  <Route 
    key="user-dashboard"
    path="/user-dashboard" 
    element={
      <ProtectedRoute requiredRole="user">
        <UserLayout showNavbar={false}>
          <UserDashboard />
        </UserLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="user-bookings"
    path="/user/bookings" 
    element={
      <ProtectedRoute requiredRole="user">
        <UserLayout>
          <Bookings />
        </UserLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="user-payments"
    path="/user/payments" 
    element={
      <ProtectedRoute requiredRole="user">
        <UserLayout>
          <Payments />
        </UserLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="user-messages"
    path="/user/messages" 
    element={
      <ProtectedRoute requiredRole="user">
        <UserLayout>
          <Messages />
        </UserLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="user-settings"
    path="/user/settings" 
    element={
      <ProtectedRoute requiredRole="user">
        <UserLayout>
          <Settings />
        </UserLayout>
      </ProtectedRoute>
    } 
  />
];
