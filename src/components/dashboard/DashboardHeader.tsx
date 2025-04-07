
import React from 'react';

interface DashboardHeaderProps {
  userRole: string;
}

const DashboardHeader = ({ userRole }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h1>
      <p className="text-slate-600">Welcome to the Great Xcape Ghana Ltd. management system.</p>
    </div>
  );
};

export default DashboardHeader;
