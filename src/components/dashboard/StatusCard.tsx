
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
    <div className={cn("p-6 rounded-lg shadow-sm border", bgClass || "bg-card")}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-1 text-xs">
              <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
