
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';

const UserDashboardHeader = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <DashboardHeader userRole="user" />
      <Button 
        variant="outline" 
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white border-olive/20 hover:bg-olive/10"
      >
        <LogOutIcon className="h-4 w-4" />
        Log Out
      </Button>
    </div>
  );
};

export default UserDashboardHeader;
