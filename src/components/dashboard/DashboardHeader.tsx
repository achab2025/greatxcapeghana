
import React from 'react';

interface DashboardHeaderProps {
  userRole: string;
}

const DashboardHeader = ({ userRole }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-olive-dark">
        {userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h1>
      <p className="text-olive-dark/70 mt-2">
        Welcome to the Great Xcape Ghana Ltd. management system.
      </p>
      <div className="h-1 w-20 bg-gradient-to-r from-olive to-olive-light rounded-full mt-4"></div>
    </div>
  );
};

export default DashboardHeader;
