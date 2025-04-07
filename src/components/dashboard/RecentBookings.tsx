
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
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Confirmed</Badge>;
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
    <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-slate-200">
        <CardTitle className="text-indigo-700">Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div 
              key={booking.id} 
              className="flex items-start p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                <CalendarIcon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-slate-800">{booking.guestName}</p>
                    <p className="text-xs text-slate-500">{booking.houseName}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(booking.bookingStatus)}
                    {getPaymentBadge(booking.paymentStatus)}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <p className="text-slate-500">
                    {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-slate-800">${booking.totalAmount}</p>
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
