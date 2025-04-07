
import React from 'react';
import { Booking } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, UserIcon } from 'lucide-react';

interface UpcomingCheckinsProps {
  bookings: Booking[];
}

const UpcomingCheckins = ({ bookings }: UpcomingCheckinsProps) => {
  return (
    <Card className="mb-6 border shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2" size={18} />
          Upcoming Check-ins
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.slice(0, 3).map((booking) => (
            <div key={`checkin-${booking.id}`} className="flex items-center space-x-3 border-b border-gray-100 pb-2 last:border-0">
              <div className="bg-primary/10 p-2 rounded-full">
                <UserIcon size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{booking.guestName}</p>
                <p className="text-xs text-muted-foreground">
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
