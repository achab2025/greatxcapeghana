
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgClass?: string;
}

const StatusCard = ({ title, value, icon, trend, bgClass }: StatusCardProps) => {
  return (
    <div className={cn("p-6 rounded-lg shadow-md transition-all duration-300 hover:translate-y-[-5px]", bgClass || "bg-card")}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-white/70">{title}</h3>
          <p className="text-2xl font-bold mt-1 text-white">{value}</p>
          {trend && (
            <div className="flex items-center mt-1 text-xs">
              <span className={trend.isPositive ? 'text-[#8FE98B]' : 'text-[#E98B8B]'}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-white/50 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-[#5e6a13]/30 text-white">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
