
import React, { useState, useEffect } from 'react';
import BookingTable from '@/components/bookings/BookingTable';
import BookingForm from '@/components/bookings/BookingForm';
import UserBookingFormDialog from '@/components/user-bookings/UserBookingFormDialog';
import BookingFilters from '@/components/bookings/BookingFilters';
import BookingStats from '@/components/bookings/BookingStats';
import BookingActions from '@/components/bookings/BookingActions';
import { bookings } from '@/data/mockData';
import { Booking } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { useBookingFilters } from '@/hooks/useBookingFilters';

const Bookings = () => {
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | undefined>(undefined);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    sortBy,
    setSortBy,
    activeFiltersCount,
    filteredAndSortedBookings,
    clearFilters
  } = useBookingFilters(bookingsList);
  
  useEffect(() => {
    // Get the user role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    
    // Filter bookings based on role
    if (role === "user") {
      // In a real app, you would filter by userId
      // For now, just show the first few bookings as an example
      setBookingsList(bookings.slice(0, 5));
    } else {
      // Admin sees all bookings
      setBookingsList(bookings);
    }
  }, []);
  
  const handleViewBooking = (id: string) => {
    const booking = bookingsList.find(b => b.id === id);
    if (booking) {
      toast({
        title: "View Booking",
        description: `Viewing booking for ${booking.guestName} at ${booking.houseName}`,
      });
    }
  };
  
  const handleEditBooking = (id: string) => {
    const booking = bookingsList.find(b => b.id === id);
    if (booking) {
      setCurrentBooking(booking);
      setIsFormOpen(true);
    }
  };
  
  const handleDeleteBooking = (id: string) => {
    // In a real app, you'd want a confirmation dialog
    setBookingsList(bookingsList.filter(b => b.id !== id));
    setSelectedBookings(selectedBookings.filter(bid => bid !== id));
    toast({
      title: "Booking Deleted",
      description: "The booking has been deleted successfully.",
    });
  };
  
  const handleCreateBooking = () => {
    setCurrentBooking(undefined);
    setIsFormOpen(true);
  };
  
  const handleFormSubmit = (data: Booking) => {
    if (currentBooking) {
      // Update existing booking
      setBookingsList(bookingsList.map(b => 
        b.id === currentBooking.id ? data : b
      ));
      toast({
        title: "Booking Updated",
        description: "The booking has been updated successfully.",
      });
    } else {
      // Create new booking
      setBookingsList([...bookingsList, data]);
      toast({
        title: "Booking Created",
        description: userRole === "user" 
          ? "Your booking request has been submitted successfully."
          : "A new booking has been created successfully.",
      });
    }
    setIsFormOpen(false);
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBookings(filteredAndSortedBookings.map(b => b.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedBookings([...selectedBookings, id]);
    } else {
      setSelectedBookings(selectedBookings.filter(bid => bid !== id));
    }
  };

  const handleBulkStatusUpdate = (status: string) => {
    setBookingsList(bookingsList.map(booking => 
      selectedBookings.includes(booking.id) 
        ? { ...booking, bookingStatus: status }
        : booking
    ));
    setSelectedBookings([]);
    toast({
      title: "Bookings Updated",
      description: `${selectedBookings.length} bookings updated to ${status}.`,
    });
  };

  const handleBulkPaymentUpdate = (status: string) => {
    setBookingsList(bookingsList.map(booking => 
      selectedBookings.includes(booking.id) 
        ? { ...booking, paymentStatus: status }
        : booking
    ));
    setSelectedBookings([]);
    toast({
      title: "Payment Status Updated",
      description: `${selectedBookings.length} bookings updated to ${status}.`,
    });
  };

  const handleExportBookings = () => {
    const csvContent = [
      ['Guest Name', 'House', 'Check-in', 'Check-out', 'Amount', 'Status', 'Payment'],
      ...filteredAndSortedBookings.map(booking => [
        booking.guestName,
        booking.houseName,
        booking.checkInDate,
        booking.checkOutDate,
        booking.totalAmount.toString(),
        booking.bookingStatus,
        booking.paymentStatus
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Bookings have been exported successfully.",
    });
  };

  const isUser = userRole === "user";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">
      <div className="flex-1 p-8 z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {isUser ? "My Bookings" : "All Bookings"}
            </h1>
            <p className="text-slate-600">
              {isUser 
                ? "View and manage your accommodation bookings." 
                : "Manage bookings across all houses."
              }
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mt-4"></div>
          </div>
          
          <Button 
            onClick={handleCreateBooking} 
            className={isUser 
              ? "bg-blue-600 hover:bg-blue-700 text-white transition-colors" 
              : "bg-olive hover:bg-olive-light text-white transition-colors"
            }
          >
            <PlusIcon size={16} className="mr-2" />
            {isUser ? "Request Booking" : "New Booking"}
          </Button>
        </div>

        {!isUser && <BookingStats bookings={bookingsList} />}

        <BookingFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          paymentFilter={paymentFilter}
          onPaymentFilterChange={setPaymentFilter}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onClearFilters={clearFilters}
          activeFiltersCount={activeFiltersCount}
        />

        {!isUser && (
          <BookingActions
            selectedBookings={selectedBookings}
            onSelectAll={handleSelectAll}
            onSelectBooking={handleSelectBooking}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onBulkPaymentUpdate={handleBulkPaymentUpdate}
            onExportBookings={handleExportBookings}
            bookings={filteredAndSortedBookings}
          />
        )}
        
        <div className={`bg-white rounded-xl shadow-md border ${isUser ? 'border-blue-100' : 'border-olive/10'} overflow-hidden`}>
          <BookingTable 
            bookings={filteredAndSortedBookings}
            onViewBooking={handleViewBooking}
            onEditBooking={handleEditBooking}
            onDeleteBooking={handleDeleteBooking}
            selectedBookings={selectedBookings}
            onSelectBooking={handleSelectBooking}
            showSelection={!isUser}
          />
        </div>
        
        {isUser ? (
          <UserBookingFormDialog
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
            booking={currentBooking}
            onSubmit={handleFormSubmit}
          />
        ) : (
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[600px] bg-white border border-olive/20">
              <DialogHeader>
                <DialogTitle className="text-olive-dark">
                  {currentBooking ? 'Edit Booking' : 'Create New Booking'}
                </DialogTitle>
              </DialogHeader>
              <BookingForm 
                booking={currentBooking}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Bookings;
