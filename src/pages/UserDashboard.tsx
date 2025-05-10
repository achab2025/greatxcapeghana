
import React, { useEffect } from 'react';
import { bookings, payments } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import RecentBookings from '@/components/dashboard/RecentBookings';
import RecentMessages from '@/components/dashboard/RecentMessages';
import CheckoutAlerts from '@/components/dashboard/CheckoutAlerts';
import UserDashboardHeader from '@/components/user-dashboard/UserDashboardHeader';
import UserQuickActions from '@/components/user-dashboard/UserQuickActions';
import UserStatusCards from '@/components/user-dashboard/UserStatusCards';
import UserStayCard from '@/components/user-dashboard/UserStayCard';
import UserPaymentsCard from '@/components/user-dashboard/UserPaymentsCard';

const recentMessages = [
  { id: '1', name: 'Host Support', content: 'Your early check-in request has been approved.' },
  { id: '2', name: 'Cleaning Service', content: 'Additional towels will be provided as requested.' },
  { id: '3', name: 'Property Manager', content: 'Would you like to arrange a shuttle?' },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ensure we're redirected to the user dashboard if we're a user
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "user") {
      navigate("/");
    }
  }, [navigate]);

  // Filter bookings to only show user's bookings (in a real app, this would use the current user ID)
  const userBookings = bookings.slice(0, 5);
  
  // Filter payments to show only user's payments
  const userPayments = payments.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-olive-light/10 to-olive/10 relative">
      <div className="flex-1 p-8 z-10 text-olive-dark">
        <UserDashboardHeader />
        
        {/* Checkout alerts appear at the top of the dashboard for visibility */}
        <CheckoutAlerts bookings={bookings} />
        
        {/* Quick action buttons */}
        <UserQuickActions />
        
        {/* User specific status cards */}
        <UserStatusCards 
          userBookings={userBookings} 
          userPayments={userPayments} 
          messageCount={recentMessages.length} 
        />
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UserStayCard userBookings={userBookings} />
          <UserPaymentsCard userPayments={userPayments} />
        </div>
        
        {/* Messages section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentBookings bookings={userBookings} />
          </div>
          <div>
            <RecentMessages messages={recentMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
