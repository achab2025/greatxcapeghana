
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import StatusCard from '@/components/dashboard/StatusCard';
import BookingSummary from '@/components/dashboard/BookingSummary';
import RecentBookings from '@/components/dashboard/RecentBookings';
import { bookings, dashboardSummary } from '@/data/mockData';
import { HomeIcon, CalendarIcon, DollarSignIcon, UserIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Three House Haven management system.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Total Bookings"
            value={dashboardSummary.totalBookings}
            icon={<CalendarIcon size={24} />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatusCard
            title="Available Houses"
            value={dashboardSummary.availableHouses}
            icon={<HomeIcon size={24} />}
          />
          <StatusCard
            title="Pending Payments"
            value={`$${dashboardSummary.pendingPayments}`}
            icon={<DollarSignIcon size={24} />}
            trend={{ value: 5, isPositive: false }}
          />
          <StatusCard
            title="Monthly Revenue"
            value={`$${dashboardSummary.revenue.current}`}
            icon={<DollarSignIcon size={24} />}
            trend={{ 
              value: Math.round((dashboardSummary.revenue.current - dashboardSummary.revenue.previous) / 
              dashboardSummary.revenue.previous * 100), 
              isPositive: dashboardSummary.revenue.current > dashboardSummary.revenue.previous 
            }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentBookings bookings={bookings} />
          </div>
          <div>
            <BookingSummary 
              totalBookings={dashboardSummary.totalBookings}
              completedBookings={1}
              upcomingBookings={2}
              cancelledBookings={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
