
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import StatusCard from '@/components/dashboard/StatusCard';
import BookingSummary from '@/components/dashboard/BookingSummary';
import RecentBookings from '@/components/dashboard/RecentBookings';
import { bookings, dashboardSummary } from '@/data/mockData';
import { 
  HomeIcon, 
  CalendarIcon, 
  DollarSignIcon, 
  UserIcon,
  MessageSquareIcon 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 8000 },
  { name: 'Jul', revenue: 9000 },
];

const occupancyData = [
  { name: 'Jan', rate: 65 },
  { name: 'Feb', rate: 60 },
  { name: 'Mar', rate: 80 },
  { name: 'Apr', rate: 85 },
  { name: 'May', rate: 75 },
  { name: 'Jun', rate: 90 },
  { name: 'Jul', rate: 95 },
];

const Index = () => {
  return (
    <div className="flex min-h-screen bg-[#303307] animate-gradient-xy">
      <div className="absolute inset-0 bg-gradient-to-br from-[#303307] to-[#45491a] opacity-80 -z-10"></div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNDU0OTFhIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMzMwIiBjeT0iNDU1IiByPSIyNDAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMTExOCIgY3k9IjI5MSIgcj0iMTcwIi8+PC9nPjwvc3ZnPg==')] bg-cover opacity-10 mix-blend-overlay animate-pulse"></div>
      </div>
      
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8 z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/70">Welcome to the Great Xcape Ghana Ltd. management system.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-fade-in" style={{animationDelay: "0.1s"}}>
            <StatusCard
              title="Total Bookings"
              value={dashboardSummary.totalBookings}
              icon={<CalendarIcon size={24} />}
              trend={{ value: 12, isPositive: true }}
              bgClass="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            />
          </div>
          <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
            <StatusCard
              title="Occupancy Rate"
              value={`${dashboardSummary.occupancyRate}%`}
              icon={<HomeIcon size={24} />}
              trend={{ value: 5, isPositive: true }}
              bgClass="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            />
          </div>
          <div className="animate-fade-in" style={{animationDelay: "0.3s"}}>
            <StatusCard
              title="Pending Payments"
              value={`$${dashboardSummary.pendingPayments}`}
              icon={<DollarSignIcon size={24} />}
              trend={{ value: 5, isPositive: false }}
              bgClass="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            />
          </div>
          <div className="animate-fade-in" style={{animationDelay: "0.4s"}}>
            <StatusCard
              title="Monthly Revenue"
              value={`$${dashboardSummary.revenue.current}`}
              icon={<DollarSignIcon size={24} />}
              trend={{ 
                value: Math.round((dashboardSummary.revenue.current - dashboardSummary.revenue.previous) / 
                dashboardSummary.revenue.previous * 100), 
                isPositive: dashboardSummary.revenue.current > dashboardSummary.revenue.previous 
              }}
              bgClass="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip contentStyle={{ backgroundColor: "rgba(35, 39, 7, 0.8)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }} />
                    <Line type="monotone" dataKey="revenue" stroke="#8FE98B" strokeWidth={2} dot={{ fill: "#8FE98B" }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="animate-fade-in" style={{animationDelay: "0.6s"}}>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white h-full">
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={occupancyData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip contentStyle={{ backgroundColor: "rgba(35, 39, 7, 0.8)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }} />
                    <Line type="monotone" dataKey="rate" stroke="#B4E973" strokeWidth={2} dot={{ fill: "#B4E973" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: "0.7s"}}>
            <RecentBookings bookings={bookings} />
          </div>
          <div className="animate-fade-in" style={{animationDelay: "0.8s"}}>
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
            
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquareIcon className="mr-2" size={18} />
                  Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 border-b border-white/10 pb-2">
                    <div className="bg-[#5e6a13]/30 text-white p-2 rounded-full">
                      <UserIcon size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">John Smith</p>
                      <p className="text-xs text-white/70">Is early check-in possible?</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 border-b border-white/10 pb-2">
                    <div className="bg-[#5e6a13]/30 text-white p-2 rounded-full">
                      <UserIcon size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">Sarah Johnson</p>
                      <p className="text-xs text-white/70">Need extra towels please.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-[#5e6a13]/30 text-white p-2 rounded-full">
                      <UserIcon size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">Alex Lee</p>
                      <p className="text-xs text-white/70">Requesting airport shuttle.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
