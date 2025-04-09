
import React from 'react';
import { Booking } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from 'lucide-react';

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings = ({ bookings }: RecentBookingsProps) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-olive hover:bg-olive-dark text-white">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Completed</Badge>;
      case 'canceled':
        return <Badge className="bg-rose-500 hover:bg-rose-600 text-white">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getPaymentBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge variant="outline" className="border-emerald-500 text-emerald-500">Paid</Badge>;
      case 'partial':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Partial</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-rose-500 text-rose-500">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="border border-olive/20 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-olive-light/10 to-olive/10 border-b border-olive/20">
        <CardTitle className="text-olive-dark">Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="flex items-start p-3 border border-olive/20 rounded-lg hover:bg-olive/5 transition-all duration-300"
            >
              <div className="p-2 rounded-full bg-olive/10 text-olive-dark mr-3">
                <CalendarIcon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-olive-dark">{booking.guestName}</p>
                    <p className="text-xs text-olive-dark/60">{booking.houseName}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(booking.bookingStatus)}
                    {getPaymentBadge(booking.paymentStatus)}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <p className="text-olive-dark/60">
                    {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-olive-dark">${booking.totalAmount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
