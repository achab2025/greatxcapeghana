
import { useState, useEffect } from 'react';
import { Booking } from '@/lib/types';
import { bookings } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export const useBookingsManagement = () => {
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | undefined>(undefined);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  
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

  return {
    bookingsList,
    setBookingsList,
    isFormOpen,
    setIsFormOpen,
    currentBooking,
    userRole,
    selectedBookings,
    setSelectedBookings,
    handleViewBooking,
    handleEditBooking,
    handleDeleteBooking,
    handleCreateBooking,
    handleFormSubmit,
    handleFormCancel
  };
};
