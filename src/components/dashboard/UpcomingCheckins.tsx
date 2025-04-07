
import React from 'react';
import { Booking } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, UserIcon } from 'lucide-react';

interface UpcomingCheckinsProps {
  bookings: Booking[];
}

const UpcomingCheckins = ({ bookings }: UpcomingCheckinsProps) => {
  return (
    <Card className="mb-6 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-200">
        <CardTitle className="text-amber-700 flex items-center">
          <CalendarIcon className="mr-2" size={18} />
          Upcoming Check-ins
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        <div className="space-y-4">
          {bookings.slice(0, 3).map((booking) => (
            <div key={`checkin-${booking.id}`} className="flex items-center space-x-3 border-b border-slate-100 pb-2 last:border-0">
              <div className="bg-amber-100 p-2 rounded-full">
                <UserIcon size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-sm text-slate-800">{booking.guestName}</p>
                <p className="text-xs text-slate-500">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingCheckins;
