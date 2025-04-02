
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import BookingTable from '@/components/bookings/BookingTable';
import BookingForm from '@/components/bookings/BookingForm';
import { bookings } from '@/data/mockData';
import { Booking } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const Bookings = () => {
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | undefined>(undefined);
  
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
        description: "A new booking has been created successfully.",
      });
    }
    setIsFormOpen(false);
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Bookings</h1>
            <p className="text-muted-foreground">Manage your bookings across all houses.</p>
          </div>
          
          <Button onClick={handleCreateBooking}>
            <PlusIcon size={16} className="mr-2" />
            New Booking
          </Button>
        </div>
        
        <BookingTable 
          bookings={bookingsList}
          onViewBooking={handleViewBooking}
          onEditBooking={handleEditBooking}
          onDeleteBooking={handleDeleteBooking}
        />
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
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
      </div>
    </div>
  );
};

export default Bookings;
