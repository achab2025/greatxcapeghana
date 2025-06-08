
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/lib/types';
import { CalendarIcon, DollarSignIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

interface BookingStatsProps {
  bookings: Booking[];
}

const BookingStats = ({ bookings }: BookingStatsProps) => {
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.bookingStatus === 'confirmed').length;
  const completedBookings = bookings.filter(b => b.bookingStatus === 'completed').length;
  const pendingPayments = bookings.filter(b => b.paymentStatus === 'pending').length;
  
  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.totalAmount, 0);
  
  const averageBookingValue = totalBookings > 0 ? 
    bookings.reduce((sum, b) => sum + b.totalAmount, 0) / totalBookings : 0;

  const thisMonth = new Date();
  thisMonth.setDate(1);
  const thisMonthBookings = bookings.filter(b => 
    new Date(b.checkInDate) >= thisMonth
  ).length;

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: CalendarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Confirmed',
      value: confirmedBookings,
      icon: TrendingUpIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSignIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'This Month',
      value: thisMonthBookings,
      icon: UsersIcon,
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
      
      {pendingPayments > 0 && (
        <Card className="border border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">
                  Pending Payments
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-orange-900">
                    {pendingPayments}
                  </p>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    Needs Attention
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingStats;
