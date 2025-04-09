
import React from 'react';
import { bookings, dashboardSummary } from '@/data/mockData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatusCardGrid from '@/components/dashboard/StatusCardGrid';
import RevenueTrendsChart from '@/components/dashboard/RevenueTrendsChart';
import OccupancyRateChart from '@/components/dashboard/OccupancyRateChart';
import RecentBookings from '@/components/dashboard/RecentBookings';
import UpcomingCheckins from '@/components/dashboard/UpcomingCheckins';
import RecentMessages from '@/components/dashboard/RecentMessages';

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 8000 },
  { name: 'Jul', revenue: 9000 },
];

const occupancyData = [
  { name: 'Jan', rate: 65 },
  { name: 'Feb', rate: 60 },
  { name: 'Mar', rate: 80 },
  { name: 'Apr', rate: 85 },
  { name: 'May', rate: 75 },
  { name: 'Jun', rate: 90 },
  { name: 'Jul', rate: 95 },
];

const recentMessages = [
  { id: '1', name: 'John Smith', content: 'Is early check-in possible?' },
  { id: '2', name: 'Sarah Johnson', content: 'Need extra towels please.' },
  { id: '3', name: 'Alex Lee', content: 'Requesting airport shuttle.' },
];

const Index = () => {
  // Get user role
  const userRole = localStorage.getItem("userRole") || "user";
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-olive-light/10 to-olive/10 relative">
      <div className="flex-1 p-8 z-10 text-olive-dark">
        <DashboardHeader userRole={userRole} />
        
        <StatusCardGrid dashboardSummary={dashboardSummary} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueTrendsChart data={revenueData} />
          </div>
          <div>
            <OccupancyRateChart data={occupancyData} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentBookings bookings={bookings} />
          </div>
          <div>
            <UpcomingCheckins bookings={bookings} />
            <RecentMessages messages={recentMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
