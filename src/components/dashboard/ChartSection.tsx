
import React from 'react';
import RevenueChart from './charts/RevenueChart';
import OccupancyChart from './charts/OccupancyChart';

interface ChartSectionProps {
  revenueData: Array<{ name: string; revenue: number }>;
  occupancyData: Array<{ name: string; rate: number }>;
}

const ChartSection = ({ revenueData, occupancyData }: ChartSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: "0.5s"}}>
        <RevenueChart data={revenueData} />
      </div>
      <div className="animate-fade-in" style={{animationDelay: "0.6s"}}>
        <OccupancyChart data={occupancyData} />
      </div>
    </div>
  );
};

export default ChartSection;
