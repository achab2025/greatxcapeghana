
import React from 'react';
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
  // Get user role
  const userRole = localStorage.getItem("userRole") || "user";
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 p-8 z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            {userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </h1>
          <p className="text-muted-foreground">Welcome to the Great Xcape Ghana Ltd. management system.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Total Bookings"
            value={dashboardSummary.totalBookings}
            icon={<CalendarIcon size={24} />}
            trend={{ value: 12, isPositive: true }}
            bgClass="bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
          />
          <StatusCard
            title="Occupancy Rate"
            value={`${dashboardSummary.occupancyRate}%`}
            icon={<HomeIcon size={24} />}
            trend={{ value: 5, isPositive: true }}
            bgClass="bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
          />
          <StatusCard
            title="Pending Payments"
            value={`$${dashboardSummary.pendingPayments}`}
            icon={<DollarSignIcon size={24} />}
            trend={{ value: 5, isPositive: false }}
            bgClass="bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
          />
          <StatusCard
            title="Monthly Revenue"
            value={`$${dashboardSummary.revenue.current}`}
            icon={<DollarSignIcon size={24} />}
            trend={{ 
              value: Math.round((dashboardSummary.revenue.current - dashboardSummary.revenue.previous) / 
              dashboardSummary.revenue.previous * 100), 
              isPositive: dashboardSummary.revenue.current > dashboardSummary.revenue.previous 
            }}
            bgClass="bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(0,0,0,0.7)" />
                    <YAxis stroke="rgba(0,0,0,0.7)" />
                    <Tooltip contentStyle={{ backgroundColor: "white", color: "#000", border: "1px solid rgba(0,0,0,0.1)" }} />
                    <Line type="monotone" dataKey="revenue" stroke="#4a5213" strokeWidth={2} dot={{ fill: "#4a5213" }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={occupancyData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(0,0,0,0.7)" />
                    <YAxis stroke="rgba(0,0,0,0.7)" />
                    <Tooltip contentStyle={{ backgroundColor: "white", color: "#000", border: "1px solid rgba(0,0,0,0.1)" }} />
                    <Line type="monotone" dataKey="rate" stroke="#5e6a13" strokeWidth={2} dot={{ fill: "#5e6a13" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentBookings bookings={bookings} />
          </div>
          <div>
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
            
            <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquareIcon className="mr-2" size={18} />
                  Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 border-b border-gray-100 pb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <UserIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">John Smith</p>
                      <p className="text-xs text-muted-foreground">Is early check-in possible?</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 border-b border-gray-100 pb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <UserIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Need extra towels please.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <UserIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Alex Lee</p>
                      <p className="text-xs text-muted-foreground">Requesting airport shuttle.</p>
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
