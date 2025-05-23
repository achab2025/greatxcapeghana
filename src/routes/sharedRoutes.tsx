
import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import UserLayout from '@/components/layout/UserLayout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

// Pages
import Houses from '@/pages/Houses';
import Bookings from '@/pages/Bookings';
import Payments from '@/pages/Payments';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';

export const sharedRoutes = [
  <Route 
    key="shared-houses"
    path="/houses" 
    element={
      <ProtectedRoute>
        {localStorage.getItem("userRole") === "user" ? (
          <UserLayout>
            <Houses />
          </UserLayout>
        ) : (
          <AdminLayout>
            <Houses />
          </AdminLayout>
        )}
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="shared-bookings"
    path="/bookings" 
    element={
      <ProtectedRoute>
        {localStorage.getItem("userRole") === "user" ? (
          <UserLayout>
            <Bookings />
          </UserLayout>
        ) : (
          <AdminLayout>
            <Bookings />
          </AdminLayout>
        )}
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="shared-payments"
    path="/payments" 
    element={
      <ProtectedRoute>
        {localStorage.getItem("userRole") === "user" ? (
          <UserLayout>
            <Payments />
          </UserLayout>
        ) : (
          <AdminLayout>
            <Payments />
          </AdminLayout>
        )}
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="shared-messages"
    path="/messages" 
    element={
      <ProtectedRoute>
        {localStorage.getItem("userRole") === "user" ? (
          <UserLayout>
            <Messages />
          </UserLayout>
        ) : (
          <AdminLayout>
            <Messages />
          </AdminLayout>
        )}
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="shared-settings"
    path="/settings" 
    element={
      <ProtectedRoute>
        {localStorage.getItem("userRole") === "user" ? (
          <UserLayout>
            <Settings />
          </UserLayout>
        ) : (
          <AdminLayout>
            <Settings />
          </AdminLayout>
        )}
      </ProtectedRoute>
    } 
  />
];
