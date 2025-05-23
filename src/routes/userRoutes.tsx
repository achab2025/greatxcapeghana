
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
      <ProtectedRoute>
        <UserLayout showNavbar={false}>
          <UserDashboard />
        </UserLayout>
      </ProtectedRoute>
    } 
  />
];
