
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
    key="admin-dashboard"
    path="/admin-dashboard" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <Index />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-houses"
    path="/admin/houses" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <Houses />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-bookings"
    path="/admin/bookings" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <Bookings />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-guests"
    path="/admin/guests" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <Guests />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-payments"
    path="/admin/payments" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <Payments />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-reports"
    path="/admin/reports" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <Reports />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-messages"
    path="/admin/messages" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <Messages />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="admin-settings"
    path="/admin/settings" 
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <Settings />
        </AdminLayout>
      </ProtectedRoute>
    } 
  />
];
