
import React from 'react';
import TopNavbar from './TopNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default AdminLayout;
