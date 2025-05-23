
import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import Houses from '@/pages/Houses';
import Bookings from '@/pages/Bookings';
import Guests from '@/pages/Guests';
import Payments from '@/pages/Payments';
import Reports from '@/pages/Reports';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';

export const adminRoutes = [
  <Route 
    key="admin-index"
    path="/" 
    element={
      <ProtectedRoute>
        <AdminLayout>
          <Index />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-guests"
    path="/guests" 
    element={
      <ProtectedRoute>
        <AdminLayout>
          <Guests />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-reports"
    path="/reports" 
    element={
      <ProtectedRoute>
        <AdminLayout>
          <Reports />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />
];
