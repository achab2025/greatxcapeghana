
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from '@/lib/types';
import { CalendarIcon, UserIcon } from 'lucide-react';

interface UpcomingCheckinsProps {
  bookings: Booking[];
}

const UpcomingCheckins = ({ bookings }: UpcomingCheckinsProps) => {
  return (
    <Card className="mb-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2" size={18} />
          Upcoming Check-ins
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.slice(0, 3).map((booking) => (
            <div key={`checkin-${booking.id}`} className="flex items-center space-x-3 border-b border-white/10 pb-2 last:border-0">
              <div className="bg-[#4a5213]/30 text-white p-2 rounded-full">
                <UserIcon size={16} />
              </div>
              <div>
                <p className="font-medium text-sm text-white">{booking.guestName}</p>
                <p className="text-xs text-white/70">
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
