
import { useState } from 'react';
import { Guest } from '@/lib/types';
import { guests, bookings } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

export const useGuestManagement = () => {
  const [guestsList, setGuestsList] = useState<Guest[]>(guests);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<Guest | undefined>(undefined);
  
  const handleViewGuest = (id: string) => {
    const guest = guestsList.find(g => g.id === id);
    if (guest) {
      toast({
        title: "View Guest",
        description: `Viewing guest profile for ${guest.firstName} ${guest.lastName}`,
      });
    }
  };
  
  const handleEditGuest = (id: string) => {
    const guest = guestsList.find(g => g.id === id);
    if (guest) {
      setCurrentGuest(guest);
      setIsFormOpen(true);
    }
  };
  
  const handleDeleteGuest = (id: string) => {
    setGuestsList(guestsList.filter(g => g.id !== id));
    toast({
      title: "Guest Deleted",
      description: "The guest has been deleted successfully.",
    });
  };
  
  const handleViewBookingHistory = (id: string) => {
    const guest = guestsList.find(g => g.id === id);
    if (guest) {
      const guestBookings = bookings.filter(b => b.guestId === id);
      toast({
        title: `Bookings for ${guest.firstName} ${guest.lastName}`,
        description: `Found ${guestBookings.length} bookings for this guest.`,
      });
    }
  };
  
  const handleCreateGuest = () => {
    setCurrentGuest(undefined);
    setIsFormOpen(true);
  };
  
  const handleFormSubmit = (data: Guest) => {
    if (currentGuest) {
      // Update existing guest
      setGuestsList(guestsList.map(g => 
        g.id === currentGuest.id ? data : g
      ));
      toast({
        title: "Guest Updated",
        description: "The guest has been updated successfully.",
      });
    } else {
      // Create new guest
      setGuestsList([...guestsList, data]);
      toast({
        title: "Guest Created",
        description: "A new guest has been created successfully.",
      });
    }
    setIsFormOpen(false);
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  return {
    guestsList,
    isFormOpen,
    currentGuest,
    setIsFormOpen,
    handleViewGuest,
    handleEditGuest,
    handleDeleteGuest,
    handleViewBookingHistory,
    handleCreateGuest,
    handleFormSubmit,
    handleFormCancel
  };
};
