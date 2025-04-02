
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
        return <Badge className="bg-blue-500">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getPaymentBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge variant="outline" className="border-green-500 text-green-500">Paid</Badge>;
      case 'partial':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Partial</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-red-500 text-red-500">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-start p-3 border rounded-lg">
              <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                <CalendarIcon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{booking.guestName}</p>
                    <p className="text-xs text-muted-foreground">{booking.houseName}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(booking.bookingStatus)}
                    {getPaymentBadge(booking.paymentStatus)}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <p className="text-muted-foreground">
                    {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p className="font-semibold">${booking.totalAmount}</p>
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
