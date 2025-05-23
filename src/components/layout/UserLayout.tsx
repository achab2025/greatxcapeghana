
import React from 'react';
import UserNavbar from './UserNavbar';

interface UserLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

const UserLayout = ({ children, showNavbar = true }: UserLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <UserNavbar />}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default UserLayout;
