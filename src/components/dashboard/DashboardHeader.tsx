
import React from 'react';

interface DashboardHeaderProps {
  userRole: string;
}

const DashboardHeader = ({ userRole }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-primary">
        {userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h1>
      <p className="text-muted-foreground">Welcome to the Great Xcape Ghana Ltd. management system.</p>
    </div>
  );
};

export default DashboardHeader;
