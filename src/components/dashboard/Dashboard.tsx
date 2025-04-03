
import React from 'react';
import DashboardHeader from './DashboardHeader';
import StatusCardGrid from './StatusCardGrid';
import ChartSection from './ChartSection';
import ActivitySection from './ActivitySection';
import { revenueData, occupancyData } from '@/data/chartData';
import { bookings, dashboardSummary } from '@/data/mockData';

const Dashboard = () => {
  return (
    <div className="w-full p-8 z-10">
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Welcome to the Great Xcape Ghana Ltd. management system." 
      />
      <StatusCardGrid dashboardSummary={dashboardSummary} />
      <ChartSection revenueData={revenueData} occupancyData={occupancyData} />
      <ActivitySection bookings={bookings} />
    </div>
  );
};

export default Dashboard;
