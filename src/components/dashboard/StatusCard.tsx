
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
    <div className={cn(
      "p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] border border-olive/20",
      bgClass || "bg-white"
    )}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-olive-dark/70">{title}</h3>
          <p className="text-2xl font-bold mt-1 text-olive-dark">{value}</p>
          {trend && (
            <div className="flex items-center mt-1 text-xs">
              <span className={cn(
                "flex items-center",
                trend.isPositive ? 'text-emerald-500' : 'text-rose-500'
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-olive-dark/50 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-full text-white",
          trend?.isPositive ? "bg-gradient-to-br from-olive to-olive-light" : 
                            "bg-gradient-to-br from-olive-dark to-olive"
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
