
import React from 'react';
import RecentBookings from '@/components/dashboard/RecentBookings';
import UpcomingCheckins from '@/components/dashboard/widgets/UpcomingCheckins';
import RecentMessages from '@/components/dashboard/widgets/RecentMessages';
import { Booking } from '@/lib/types';

interface ActivitySectionProps {
  bookings: Booking[];
}

const ActivitySection = ({ bookings }: ActivitySectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: "0.7s"}}>
        <RecentBookings bookings={bookings} />
      </div>
      <div className="animate-fade-in" style={{animationDelay: "0.8s"}}>
        <UpcomingCheckins bookings={bookings} />
        <RecentMessages />
      </div>
    </div>
  );
};

export default ActivitySection;
