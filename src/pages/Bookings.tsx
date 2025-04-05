
import React, { useState } from 'react';
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white/20 to-gray-100/20 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#303307] to-[#45491a] opacity-80 -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNDU0OTFhIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMzMwIiBjeT0iNDU1IiByPSIyNDAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMTExOCIgY3k9IjI5MSIgcj0iMTcwIi8+PC9nPjwvc3ZnPg==')] bg-cover opacity-10 mix-blend-overlay animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-olive/20 animate-float"
            style={{
              width: `${Math.random() * 25 + 5}px`,
              height: `${Math.random() * 25 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex-1 p-8 z-10 text-white">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Bookings</h1>
            <p className="text-white/70">Manage your bookings across all houses.</p>
          </div>
          
          <Button onClick={handleCreateBooking} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
            <PlusIcon size={16} className="mr-2" />
            New Booking
          </Button>
        </div>
        
        <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
          <BookingTable 
            bookings={bookingsList}
            onViewBooking={handleViewBooking}
            onEditBooking={handleEditBooking}
            onDeleteBooking={handleDeleteBooking}
          />
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px] bg-white/10 backdrop-blur-md border border-white/20 text-white">
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
