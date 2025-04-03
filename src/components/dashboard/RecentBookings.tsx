
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
        return <Badge className="bg-[#B4E973] text-[#303307]">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-[#8FE98B] text-[#303307]">Completed</Badge>;
      case 'canceled':
        return <Badge className="bg-[#E98B8B] text-[#303307]">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getPaymentBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge variant="outline" className="border-[#8FE98B] text-[#8FE98B]">Paid</Badge>;
      case 'partial':
        return <Badge variant="outline" className="border-[#E9D68B] text-[#E9D68B]">Partial</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-[#E98B8B] text-[#E98B8B]">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div 
              key={booking.id} 
              className="flex items-start p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-300"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="p-2 rounded-full bg-[#5e6a13]/30 text-white mr-3">
                <CalendarIcon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-white">{booking.guestName}</p>
                    <p className="text-xs text-white/70">{booking.houseName}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(booking.bookingStatus)}
                    {getPaymentBadge(booking.paymentStatus)}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <p className="text-white/70">
                    {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-white">${booking.totalAmount}</p>
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
