
import React, { useEffect } from 'react';
import { bookings, dashboardSummary, payments } from '@/data/mockData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatusCardGrid from '@/components/dashboard/StatusCardGrid';
import RecentBookings from '@/components/dashboard/RecentBookings';
import UpcomingCheckins from '@/components/dashboard/UpcomingCheckins';
import RecentMessages from '@/components/dashboard/RecentMessages';
import CheckoutAlerts from '@/components/dashboard/CheckoutAlerts';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CreditCardIcon, MessageSquareIcon, HomeIcon, BellIcon, LogOutIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const recentMessages = [
  { id: '1', name: 'Host Support', content: 'Your early check-in request has been approved.' },
  { id: '2', name: 'Cleaning Service', content: 'Additional towels will be provided as requested.' },
  { id: '3', name: 'Property Manager', content: 'Would you like to arrange a shuttle?' },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ensure we're redirected to the user dashboard if we're a user
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "user") {
      navigate("/");
    }
  }, [navigate]);

  // Filter bookings to only show user's bookings (in a real app, this would use the current user ID)
  const userBookings = bookings.slice(0, 5);
  
  // Filter payments to show only user's payments
  const userPayments = payments.slice(0, 3);
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-olive-light/10 to-olive/10 relative">
      <div className="flex-1 p-8 z-10 text-olive-dark">
        <div className="flex justify-between items-center mb-6">
          <DashboardHeader userRole="user" />
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white border-olive/20 hover:bg-olive/10"
          >
            <LogOutIcon className="h-4 w-4" />
            Log Out
          </Button>
        </div>
        
        {/* Checkout alerts appear at the top of the dashboard for visibility */}
        <CheckoutAlerts bookings={bookings} />
        
        {/* Quick action buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/user-dashboard")}
            className="flex flex-col h-24 items-center justify-center bg-white border-olive/20 hover:bg-olive/10"
          >
            <HomeIcon className="h-6 w-6 mb-2 text-olive-dark" />
            <span>Dashboard</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/bookings")}
            className="flex flex-col h-24 items-center justify-center bg-white border-olive/20 hover:bg-olive/10"
          >
            <CalendarIcon className="h-6 w-6 mb-2 text-olive-dark" />
            <span>My Bookings</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/payments")}
            className="flex flex-col h-24 items-center justify-center bg-white border-olive/20 hover:bg-olive/10"
          >
            <CreditCardIcon className="h-6 w-6 mb-2 text-olive-dark" />
            <span>Payments</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/messages")}
            className="flex flex-col h-24 items-center justify-center bg-white border-olive/20 hover:bg-olive/10"
          >
            <MessageSquareIcon className="h-6 w-6 mb-2 text-olive-dark" />
            <span>Messages</span>
          </Button>
        </div>
        
        {/* User specific status cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border border-olive/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-olive-dark" /> 
                Active Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userBookings.filter(b => b.bookingStatus === 'confirmed').length}</div>
              <p className="text-sm text-olive-dark/70">Current and upcoming stays</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border border-olive/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCardIcon className="mr-2 h-5 w-5 text-olive-dark" /> 
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${userPayments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}
              </div>
              <p className="text-sm text-olive-dark/70">On all bookings</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border border-olive/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BellIcon className="mr-2 h-5 w-5 text-olive-dark" /> 
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{recentMessages.length}</div>
              <p className="text-sm text-olive-dark/70">Unread messages</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border border-olive/20 shadow-md">
            <CardHeader className="bg-gradient-to-r from-olive-light/10 to-olive/10 border-b border-olive/20">
              <CardTitle className="text-olive-dark">Your Upcoming Stays</CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-4">
              {userBookings.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.filter(b => b.bookingStatus === 'confirmed').slice(0, 3).map(booking => (
                    <div key={booking.id} className="p-4 bg-olive-light/10 rounded-lg border border-olive/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-olive-dark">{booking.houseName}</h3>
                          <p className="text-sm text-olive/70">
                            {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-olive hover:bg-olive-dark">Confirmed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-olive/70">
                  <p>No upcoming stays</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-olive text-olive hover:bg-olive/10"
                    onClick={() => navigate("/houses")}
                  >
                    Browse Accommodations
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="border border-olive/20 shadow-md">
            <CardHeader className="bg-gradient-to-r from-olive-light/10 to-olive/10 border-b border-olive/20">
              <CardTitle className="text-olive-dark">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-olive/10">
                    <TableHead className="text-olive-dark">Date</TableHead>
                    <TableHead className="text-olive-dark">Amount</TableHead>
                    <TableHead className="text-olive-dark">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPayments.map(payment => (
                    <TableRow key={payment.id} className="border-olive/10">
                      <TableCell className="py-2 text-olive-dark">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="py-2 text-olive-dark">${payment.amount.toFixed(2)}</TableCell>
                      <TableCell className="py-2">
                        <Badge className={
                          payment.status === 'successful' ? 'bg-emerald-500' : 
                          payment.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                        }>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-right">
                <Button 
                  variant="ghost" 
                  className="text-olive hover:bg-olive/10"
                  onClick={() => navigate("/payments")}
                >
                  View All Payments →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Messages section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentBookings bookings={userBookings} />
          </div>
          <div>
            <RecentMessages messages={recentMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
