
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

interface BookingsHeaderProps {
  isUser: boolean;
  onCreateBooking: () => void;
}

const BookingsHeader = ({ isUser, onCreateBooking }: BookingsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {isUser ? "My Bookings" : "All Bookings"}
        </h1>
        <p className="text-slate-600">
          {isUser 
            ? "View and manage your accommodation bookings." 
            : "Manage bookings across all houses."
          }
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mt-4"></div>
      </div>
      
      <Button 
        onClick={onCreateBooking} 
        className={isUser 
          ? "bg-blue-600 hover:bg-blue-700 text-white transition-colors" 
          : "bg-olive hover:bg-olive-light text-white transition-colors"
        }
      >
        <PlusIcon size={16} className="mr-2" />
        {isUser ? "Request Booking" : "New Booking"}
      </Button>
    </div>
  );
};

export default BookingsHeader;
