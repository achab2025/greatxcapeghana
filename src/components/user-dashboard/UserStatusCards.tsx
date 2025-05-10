
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { CalendarIcon, CreditCardIcon, BellIcon } from 'lucide-react';
import { Booking, Payment } from '@/lib/types';

interface UserStatusCardsProps {
  userBookings: Booking[];
  userPayments: Payment[];
  messageCount: number;
}

const UserStatusCards = ({ userBookings, userPayments, messageCount }: UserStatusCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-white/60 backdrop-blur-sm border border-olive/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-olive-dark" /> 
            Active Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{userBookings.filter(b => b.bookingStatus === 'confirmed').length}</div>
          <p className="text-sm text-olive-dark/70">Current and upcoming stays</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/60 backdrop-blur-sm border border-olive/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CreditCardIcon className="mr-2 h-5 w-5 text-olive-dark" /> 
            Total Spent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            ${userPayments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}
          </div>
          <p className="text-sm text-olive-dark/70">On all bookings</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/60 backdrop-blur-sm border border-olive/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BellIcon className="mr-2 h-5 w-5 text-olive-dark" /> 
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{messageCount}</div>
          <p className="text-sm text-olive-dark/70">Unread messages</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatusCards;
