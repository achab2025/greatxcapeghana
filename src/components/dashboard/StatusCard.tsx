
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
      "p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] border border-slate-100",
      bgClass || "bg-gradient-to-br from-white to-slate-50"
    )}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          <p className="text-2xl font-bold mt-1 text-slate-800">{value}</p>
          {trend && (
            <div className="flex items-center mt-1 text-xs">
              <span className={cn(
                "flex items-center",
                trend.isPositive ? 'text-emerald-500' : 'text-rose-500'
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-slate-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-full text-white",
          trend?.isPositive ? "bg-gradient-to-br from-indigo-500 to-violet-500" : 
                            "bg-gradient-to-br from-indigo-600 to-violet-600"
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
