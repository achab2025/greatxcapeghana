
import React from 'react';
import StatusCard from '@/components/dashboard/StatusCard';
import { CalendarIcon, HomeIcon, DollarSignIcon } from 'lucide-react';
import { DashboardSummary } from '@/lib/types';

interface StatusCardGridProps {
  dashboardSummary: DashboardSummary;
}

const StatusCardGrid = ({ dashboardSummary }: StatusCardGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatusCard
        title="Total Bookings"
        value={dashboardSummary.totalBookings}
        icon={<CalendarIcon size={24} />}
        trend={{ value: 12, isPositive: true }}
        bgClass="bg-white border-olive/20 shadow-md"
      />
      <StatusCard
        title="Occupancy Rate"
        value={`${dashboardSummary.occupancyRate}%`}
        icon={<HomeIcon size={24} />}
        trend={{ value: 5, isPositive: true }}
        bgClass="bg-white border-olive/20 shadow-md"
      />
      <StatusCard
        title="Pending Payments"
        value={`$${dashboardSummary.pendingPayments}`}
        icon={<DollarSignIcon size={24} />}
        trend={{ value: 5, isPositive: false }}
        bgClass="bg-white border-olive/20 shadow-md"
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
        bgClass="bg-white border-olive/20 shadow-md"
      />
    </div>
  );
};

export default StatusCardGrid;
