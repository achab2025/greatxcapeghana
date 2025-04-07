
import React from 'react';

interface DashboardHeaderProps {
  userRole: string;
}

const DashboardHeader = ({ userRole }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 animate-fade-down">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
        {userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h1>
      <p className="text-slate-600 mt-2">
        Welcome to the Great Xcape Ghana Ltd. management system.
      </p>
      <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full mt-4"></div>
    </div>
  );
};

export default DashboardHeader;
