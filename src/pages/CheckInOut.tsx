
import React, { useState, useEffect } from 'react';
import { bookings } from '@/data/mockData';
import { Booking } from '@/lib/types';
import CheckInOutCard from '@/components/checkinout/CheckInOutCard';
import CheckInOutFilters from '@/components/checkinout/CheckInOutFilters';
import CheckInOutStats from '@/components/checkinout/CheckInOutStats';
import CheckoutAlerts from '@/components/dashboard/CheckoutAlerts';
import { Button } from '@/components/ui/button';
import { QrCodeIcon, BellIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CheckInOut = () => {
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  useEffect(() => {
    let filtered = [...bookingsList];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.bookingStatus === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      filtered = filtered.filter(booking => {
        const checkInDate = new Date(booking.checkInDate);
        const checkOutDate = new Date(booking.checkOutDate);
        checkInDate.setHours(0, 0, 0, 0);
        checkOutDate.setHours(0, 0, 0, 0);

        switch (dateFilter) {
          case 'today':
            return checkInDate.getTime() === today.getTime() || checkOutDate.getTime() === today.getTime();
          case 'checkin-today':
            return checkInDate.getTime() === today.getTime();
          case 'checkout-today':
            return checkOutDate.getTime() === today.getTime();
          case 'upcoming':
            return checkInDate.getTime() > today.getTime();
          default:
            return true;
        }
      });
    }

    setFilteredBookings(filtered);
  }, [bookingsList, statusFilter, dateFilter]);

  const handleCheckIn = (bookingId: string) => {
    setBookingsList(bookings => 
      bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, bookingStatus: 'checked-in' }
          : booking
      )
    );
    
    toast({
      title: "Check-in Successful",
      description: "Guest has been checked in successfully.",
    });
  };

  const handleCheckOut = (bookingId: string) => {
    setBookingsList(bookings => 
      bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, bookingStatus: 'completed' }
          : booking
      )
    );
    
    toast({
      title: "Check-out Successful", 
      description: "Guest has been checked out successfully.",
    });
  };

  const handleSendNotification = (bookingId: string, type: 'checkin' | 'checkout') => {
    const booking = bookingsList.find(b => b.id === bookingId);
    if (booking) {
      toast({
        title: "Notification Sent",
        description: `${type === 'checkin' ? 'Check-in' : 'Check-out'} notification sent to ${booking.guestName}.`,
      });
    }
  };

  const generateQRCode = (bookingId: string) => {
    // In a real app, this would generate an actual QR code
    toast({
      title: "QR Code Generated",
      description: "QR code for contactless check-in has been generated.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Check-in & Check-out Management
            </h1>
            <p className="text-slate-600">
              Manage guest arrivals and departures with automated notifications.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mt-4"></div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => generateQRCode('all')}
            >
              <QrCodeIcon size={16} className="mr-2" />
              Generate QR Codes
            </Button>
            <Button 
              onClick={() => toast({
                title: "Bulk Notifications",
                description: "Sending notifications to all guests with upcoming check-ins/check-outs.",
              })}
            >
              <BellIcon size={16} className="mr-2" />
              Send Bulk Notifications
            </Button>
          </div>
        </div>

        <CheckoutAlerts bookings={bookingsList} />
        
        <CheckInOutStats bookings={bookingsList} />

        <CheckInOutFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          totalBookings={filteredBookings.length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <CheckInOutCard
              key={booking.id}
              booking={booking}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              onSendNotification={handleSendNotification}
              onGenerateQR={generateQRCode}
            />
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No bookings found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInOut;
