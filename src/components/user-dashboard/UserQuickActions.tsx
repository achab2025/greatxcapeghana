
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarIcon, CreditCardIcon, MessageSquareIcon, HomeIcon } from 'lucide-react';

const UserQuickActions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Button 
        variant="outline" 
        onClick={() => navigate("/user-dashboard")}
        className="flex flex-col h-24 items-center justify-center bg-white border-olive/20 hover:bg-olive/10"
      >
        <HomeIcon className="h-6 w-6 mb-2 text-olive-dark" />
        <span>Dashboard</span>
      </Button>
      <Button 
        variant="outline" 
        onClick={() => navigate("/bookings")}
        className="flex flex-col h-24 items-center justify-center bg-white border-olive/20 hover:bg-olive/10"
      >
        <CalendarIcon className="h-6 w-6 mb-2 text-olive-dark" />
        <span>My Bookings</span>
      </Button>
      <Button 
        variant="outline" 
        onClick={() => navigate("/payments")}
        className="flex flex-col h-24 items-center justify-center bg-white border-olive/20 hover:bg-olive/10"
      >
        <CreditCardIcon className="h-6 w-6 mb-2 text-olive-dark" />
        <span>Payments</span>
      </Button>
      <Button 
        variant="outline" 
        onClick={() => navigate("/messages")}
        className="flex flex-col h-24 items-center justify-center bg-white border-olive/20 hover:bg-olive/10"
      >
        <MessageSquareIcon className="h-6 w-6 mb-2 text-olive-dark" />
        <span>Messages</span>
      </Button>
    </div>
  );
};

export default UserQuickActions;
