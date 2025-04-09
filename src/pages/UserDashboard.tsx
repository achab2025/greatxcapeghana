
import React from 'react';
import { bookings, dashboardSummary } from '@/data/mockData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatusCardGrid from '@/components/dashboard/StatusCardGrid';
import OccupancyRateChart from '@/components/dashboard/OccupancyRateChart';
import RecentBookings from '@/components/dashboard/RecentBookings';
import UpcomingCheckins from '@/components/dashboard/UpcomingCheckins';
import RecentMessages from '@/components/dashboard/RecentMessages';

const occupancyData = [
  { name: 'Jan', rate: 65 },
  { name: 'Feb', rate: 60 },
  { name: 'Mar', rate: 80 },
  { name: 'Apr', rate: 85 },
  { name: 'May', rate: 75 },
  { name: 'Jun', rate: 90 },
  { name: 'Jul', rate: 95 },
];

const recentMessages = [
  { id: '1', name: 'John Smith', content: 'Is early check-in possible?' },
  { id: '2', name: 'Sarah Johnson', content: 'Need extra towels please.' },
  { id: '3', name: 'Alex Lee', content: 'Requesting airport shuttle.' },
];

const UserDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-olive-light/10 to-olive/10 relative">
      <div className="flex-1 p-8 z-10 text-olive-dark">
        <DashboardHeader userRole="user" />
        
        <StatusCardGrid dashboardSummary={dashboardSummary} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-olive/10 p-6 h-full">
              <h2 className="text-xl font-semibold text-olive-dark mb-4">Your Upcoming Stays</h2>
              <div className="space-y-4">
                {bookings.slice(0, 3).map(booking => (
                  <div key={booking.id} className="p-4 bg-olive-light/10 rounded-lg border border-olive/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-olive-dark">{booking.houseName}</h3>
                        <p className="text-sm text-olive/70">
                          {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && (
                  <div className="text-olive/70 text-center py-4">No upcoming stays</div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <OccupancyRateChart data={occupancyData} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentBookings bookings={bookings} />
          </div>
          <div>
            <UpcomingCheckins bookings={bookings} />
            <RecentMessages messages={recentMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
