
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Booking } from '@/lib/types';
import { LogInIcon, LogOutIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';

interface CheckInOutStatsProps {
  bookings: Booking[];
}

const CheckInOutStats = ({ bookings }: CheckInOutStatsProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCheckIns = bookings.filter(b => {
    const checkInDate = new Date(b.checkInDate);
    checkInDate.setHours(0, 0, 0, 0);
    return checkInDate.getTime() === today.getTime() && b.bookingStatus === 'confirmed';
  }).length;

  const todayCheckOuts = bookings.filter(b => {
    const checkOutDate = new Date(b.checkOutDate);
    checkOutDate.setHours(0, 0, 0, 0);
    return checkOutDate.getTime() === today.getTime() && b.bookingStatus === 'checked-in';
  }).length;

  const currentlyCheckedIn = bookings.filter(b => b.bookingStatus === 'checked-in').length;
  const completedToday = bookings.filter(b => {
    const checkOutDate = new Date(b.checkOutDate);
    checkOutDate.setHours(0, 0, 0, 0);
    return checkOutDate.getTime() === today.getTime() && b.bookingStatus === 'completed';
  }).length;

  const stats = [
    {
      title: 'Check-ins Today',
      value: todayCheckIns,
      icon: LogInIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Check-outs Today',
      value: todayCheckOuts,
      icon: LogOutIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Currently Checked In',
      value: currentlyCheckedIn,
      icon: ClockIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Completed Today',
      value: completedToday,
      icon: CheckCircleIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CheckInOutStats;
