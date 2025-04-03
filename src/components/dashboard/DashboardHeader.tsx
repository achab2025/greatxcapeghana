
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-white/70">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;
